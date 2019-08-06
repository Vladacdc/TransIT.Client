export enum Priority {
  high = 'Високий',
  medium = 'Середній',
  low = 'Низький'
}

export function convertPriorityToInt(priority: string) : number
{
  switch(priority) {
    case 'Високий':
      return 0;
    case 'Середній':
      return 1;
    case 'Низький':
      return 2;
  }
}