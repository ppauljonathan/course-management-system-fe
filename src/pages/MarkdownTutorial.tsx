import ReactMarkdown from "react-markdown";

const markdownExamples = [
  {
    title: "Headings",
    syntax: `# Heading 1\n## Heading 2\n### Heading 3`,
  },
  {
    title: "Emphasis",
    syntax: `*Italic* or _Italic_\n**Bold** or __Bold__`,
  },
  {
    title: "Lists",
    syntax: `- Item 1\n- Item 2\n  - Subitem\n\n1. First\n2. Second`,
  },
  {
    title: "Links and Images",
    syntax: `[Courses](/courses-list/all)\n\n![Logo](/src/assets/logo.svg)`,
  },
  {
    title: "Code",
    syntax: "`Inline code`\n\n```\nconsole.log('Code block');\n```",
  },
  {
    title: "Blockquote",
    syntax: `> This is a quote`,
  },
];

function MarkdownTutorial() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Markdown Tutorial</h1>
      {markdownExamples.map((example, idx) => (
        <div key={idx} className="border p-4 rounded-md bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-2">{example.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              className="w-full border p-2 rounded font-mono text-sm min-h-[100px] bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
              value={example.syntax}
              readOnly
            />
            <div className="prose dark:prose-invert max-w-none border rounded p-3 bg-gray-50 dark:bg-gray-900">
              <ReactMarkdown>{example.syntax}</ReactMarkdown>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MarkdownTutorial;
