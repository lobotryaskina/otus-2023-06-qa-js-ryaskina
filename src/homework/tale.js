export function kolobok (name) {
    let message;
    switch (name) {
        case 'Дедушка':
            message = 'Я от дедушки ушёл';
            break;
        case 'Заяц':
            message = 'Я зайцу песенку спел и ушёл';
            break;
        case 'Лиса':
            message = 'Меня съели :(';
            break;
        default:
            message = `${name}? Уже и не помню..`;
            break;
    }
    return message;
}

export function newYear (character) {
    let message;
    if (character === 'Дед Мороз' | character === 'Снегурочка') {
        message = `${character}! ${character}! ${character}!`;
      } else {
        message = 'Что-то пошло не так';
      }
    return message;
}