interface TruncateTextInterface {
  str: string;
  maxLength?: number;
  ending?: string;
}

function TruncateText({str, maxLength = 20, ending = '...'}: TruncateTextInterface) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - ending.length) + ending;
  }
  return str; 
}

export default TruncateText
