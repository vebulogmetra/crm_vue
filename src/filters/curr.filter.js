export default function currFilter(value, curr = 'RUB') {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: curr
    }).format(value)
}