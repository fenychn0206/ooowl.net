const MARK_DELIMITER = "==";
const WHITESPACE_PATTERN = /\s/;

function appendText(children, value) {
  if (!value) {
    return;
  }

  const lastChild = children.at(-1);

  if (lastChild?.type === "text") {
    lastChild.value += value;
  } else {
    children.push({ type: "text", value });
  }
}

function getText(node) {
  if (node.type === "text" || node.type === "inlineCode") {
    return node.value;
  }

  if (node.type === "break") {
    return "\n";
  }

  if (!Array.isArray(node.children)) {
    return "";
  }

  return node.children.map(getText).join("");
}

function getNextCharacter(children, childIndex, value, offset) {
  if (offset < value.length) {
    return value[offset];
  }

  for (let index = childIndex + 1; index < children.length; index += 1) {
    const text = getText(children[index]);

    if (text) {
      return text[0];
    }
  }
}

function getLastCharacter(children) {
  for (let index = children.length - 1; index >= 0; index -= 1) {
    const text = getText(children[index]);

    if (text) {
      return text.at(-1);
    }
  }
}

function isStandaloneDelimiter(value, delimiterIndex) {
  return (
    value[delimiterIndex - 1] !== "=" &&
    value[delimiterIndex + MARK_DELIMITER.length] !== "="
  );
}

function transformChildren(node) {
  const originalChildren = node.children;

  for (const child of originalChildren) {
    if (Array.isArray(child.children)) {
      transformChildren(child);
    }
  }

  const children = [];
  let hasHighlight = false;
  let markedChildren;

  function abortMark() {
    appendText(children, MARK_DELIMITER);
    children.push(...markedChildren);
    markedChildren = undefined;
  }

  for (
    let childIndex = 0;
    childIndex < originalChildren.length;
    childIndex += 1
  ) {
    const child = originalChildren[childIndex];

    if (child.type !== "text") {
      if (child.type === "break" && markedChildren) {
        abortMark();
      }

      (markedChildren ?? children).push(child);
      continue;
    }

    let offset = 0;

    while (offset < child.value.length) {
      const delimiterIndex = child.value.indexOf(MARK_DELIMITER, offset);
      const newlineIndex = child.value.indexOf("\n", offset);

      if (
        newlineIndex !== -1 &&
        (delimiterIndex === -1 || newlineIndex < delimiterIndex)
      ) {
        appendText(
          markedChildren ?? children,
          child.value.slice(offset, newlineIndex),
        );

        if (markedChildren) {
          abortMark();
        }

        appendText(children, "\n");
        offset = newlineIndex + 1;
        continue;
      }

      if (delimiterIndex === -1) {
        appendText(markedChildren ?? children, child.value.slice(offset));
        break;
      }

      appendText(
        markedChildren ?? children,
        child.value.slice(offset, delimiterIndex),
      );

      if (!isStandaloneDelimiter(child.value, delimiterIndex)) {
        appendText(markedChildren ?? children, MARK_DELIMITER);
      } else if (markedChildren) {
        const previousCharacter = getLastCharacter(markedChildren);

        if (previousCharacter && !WHITESPACE_PATTERN.test(previousCharacter)) {
          children.push({
            type: "highlight",
            data: { hName: "mark" },
            children: markedChildren,
          });
          hasHighlight = true;
          markedChildren = undefined;
        } else {
          appendText(markedChildren, MARK_DELIMITER);
        }
      } else {
        const nextCharacter = getNextCharacter(
          originalChildren,
          childIndex,
          child.value,
          delimiterIndex + MARK_DELIMITER.length,
        );

        if (nextCharacter && !WHITESPACE_PATTERN.test(nextCharacter)) {
          markedChildren = [];
        } else {
          appendText(children, MARK_DELIMITER);
        }
      }

      offset = delimiterIndex + MARK_DELIMITER.length;
    }
  }

  if (markedChildren) {
    abortMark();
  }

  if (hasHighlight) {
    node.children = children;
  }
}

export default function remarkMark() {
  return (tree) => transformChildren(tree);
}
