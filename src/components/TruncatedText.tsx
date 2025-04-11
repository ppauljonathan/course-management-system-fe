interface TruncatedTextProps {
  str: string;
  maxLength?: number;
  ending?: string;
  className?: string
}

function truncate(str: string, maxLength = 20, ending = '...') {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - ending.length) + ending;
  }
  return str;
}

function TruncatedText({str, className, maxLength = 20, ending = '...'}: TruncatedTextProps) {
  const isTruncated = str.length > maxLength;

  return (
    <div className={`relative group ${className}`}>
      <span>{ truncate(str, maxLength, ending) }</span>

      {isTruncated && (
        <div className="absolute bottom-full left-0 z-10 hidden w-max max-w-xs rounded bg-black p-2 text-xs text-white group-hover:block text-wrap break-words opacity-85">
          {str}
        </div>
      )}
    </div>
  )
}

export default TruncatedText
