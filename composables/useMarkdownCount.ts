export function useMarkdownCount(markdownText: string): number {
  // 先去除代码块内容，通常代码块在Markdown里以```或者~~~包裹
  markdownText = markdownText
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "");

  // 去除Markdown中的其他常见标记，这里只是简单示例常见的几种，实际可按需完善
  let plainText = markdownText
    .replace(/\*\*(.*?)\*\*/g, "$1") // 去除加粗标记
    .replace(/\*(.*?)\*/g, "$1") // 去除斜体标记
    .replace(/#+(.*?)\n/g, "$1\n") // 去除标题标记
    .replace(/!\[(.*?)\]\((.*?)\)/g, "") // 去除图片引用
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // 去除链接文字部分的标记，只保留文字内容
    .replace(/`(.*?)`/g, "$1"); // 去除代码块标记内的行内代码标记

  // 去除一些常见的图标相关内容，比如表情符号等（这里简单以常见的表情符号格式举例，可按需扩展）
  plainText = plainText.replace(
    /[:;][-()]*[)\(]|[\uD83C-\uDBFF][\uDC00-\uDFFF]/g,
    "",
  );

  return plainText.length;
}
