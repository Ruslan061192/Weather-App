

export const formatWeatherDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    // Форматирование времени (06:09)
    const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace('24:', '00:');

    // Форматирование дня недели (Monday)
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

    // Форматирование дня и месяца (9 Sep)
    const dayMonth = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
    });

    // Форматирование года ('23)
    const year = date.toLocaleDateString('en-US', {
        year: '2-digit'
    }).slice(1);

    return `${time} - ${weekday}, ${dayMonth} '${year}`;
};

