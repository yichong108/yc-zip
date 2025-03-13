import dayjs from 'dayjs';
import { customAlphabet } from 'nanoid';
import chalk from 'chalk';

export function generateFileName(template: string): string {
  let result = template;
  console.log(chalk.blue('[yc-zip] Template:'), template);

  const templateRegex = /\$\{([^}]+)\}/g;
  result = result.replace(templateRegex, (match, content) => {
    console.log(chalk.blue('[yc-zip] Processing:'), content);
    
    if ((/YYYY|MM|DD|HH|mm|ss/ig).test(content)) {
      try {
        const formatted = dayjs().format(content);
        if (formatted !== 'Invalid Date' && formatted !== content) {
          console.log(chalk.blue('[yc-zip] Date formatted:'), formatted);
          return formatted;
        }
      } catch (error) {
        console.error(chalk.red('[yc-zip] Date format error:'), error);
      }
    } 

    if (content.startsWith('hash(') && content.endsWith(')')) {
      try {
        const length = parseInt(content.slice(5, -1), 10);
        if (!isNaN(length)) {
          const nanoid = customAlphabet('0123456789ABCDEF', length);
          const hash = nanoid();
          console.log(chalk.blue('[yc-zip] Hash generated:'), hash);
          return hash;
        }
      } catch (error) {
        console.error(chalk.red('[yc-zip] Hash generation error:'), error);
        return match;
      }
    }

    return match;
  });
  
  return result;
}