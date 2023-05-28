export function convertToCronExpression(time: String) {
    const durationRegex = /^(\d+)\s+(\w+)$/; // Regex pattern to match the format "number unit"
  
    const match = time.match(durationRegex);
    if (!match) {
      throw new Error('Invalid time format');
    }
  
    const [, amount, unit] = match;
    let cronExpression = '';
  
    switch (unit) {
      case 'days':
        cronExpression = `0 ${amount} * * *`;
        break;
      case 'hours':
        cronExpression = `0 */${amount} * * *`;
        break;
      case 'mins':
        cronExpression = `*/${amount} * * * *`;
        break;
      default:
        throw new Error('Invalid unit');
    }
  
    return cronExpression;
  }
  