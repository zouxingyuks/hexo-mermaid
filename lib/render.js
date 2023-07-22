const reg = /(\s*)(`{3}) *(mermaid) *\n?([\s\S]+?)\s*(\2)(\n+|$)/g;

const ignore = data => {
  var source = data.source;
  var ext = source.substring(source.lastIndexOf('.')).toLowerCase();
  return ['.js', '.css', '.html', '.htm'].indexOf(ext) > -1;
}

module.exports = function (data) {
  const mermaidConfig = this.config.mermaid;
  let { enable } = mermaidConfig;
  enable = enable || false;
  if (!enable) {
    return;
  }
  if (!ignore(data)) {
    data.content = data.content
      .replace(reg, function (raw, start, startQuote, lang, content, endQuote, end) {
        return `${start}<pre class="mermaid" id="mermaid"></pre><script>
          // 使用 DOMContentLoaded 事件确保 DOM 构建完成后执行脚本
          document.addEventListener('DOMContentLoaded', function() {
          const originalContent = ${JSON.stringify(content)};
          const mermaid = document.getElementById('mermaid');
          // 创建文本节点并设置内容
          const textNode = document.createTextNode(originalContent);
          // 将文本节点添加到元素中
          mermaid.appendChild(textNode);
        });
      </script>${end}`;
      });
  }
};
