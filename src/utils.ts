import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';

export function generateFileName(template: string): string {
  let result = template;
  console.log('Input template:', template);

  // 匹配所有 ${...} 格式的模板
  const templateRegex = /\$\{([^}]+)\}/g;
  result = result.replace(templateRegex, (match, content) => {
    console.log('Matching content:', content);
    
    // 处理日期格式
    if ((/YYYY|MM|DD|HH|mm|ss/ig).test(content)) {
      try {
        const formatted = dayjs().format(content);
        // dayjs 在格式无效时会返回 'Invalid Date' 或原始字符串
        if (formatted !== 'Invalid Date' && formatted !== content) {
          console.log('Formatted date:', formatted);
          return formatted;
        }
      } catch (error) {
        console.error('Date format error:', error);
      }
    } 
 
    // 处理 hash(n) 格式
    if (content.startsWith('hash(') && content.endsWith(')')) {
      try {
        const length = parseInt(content.slice(5, -1), 10);
        if (!isNaN(length)) {
          const nanoid = customAlphabet('0123456789ABCDEF', length);
          return nanoid();
        }
      } catch (error) {
        console.error('Hash generation error:', error);
        return match;
      }
    }

    return match;
  });
  
  return result;
}