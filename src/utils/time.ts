export function timeAgo(isoString: string) {
    if (!isoString) return "";

    const now = Date.now();                 // number (ms)
    const date = new Date(isoString).getTime();  // number (ms) 
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    if (seconds < 60) return "Now";

    if (seconds < intervals.minute * 2) return "1 minute ago";
    if (seconds < intervals.hour)
        return `${Math.floor(seconds / intervals.minute)} minutes ago`;

    if (seconds < intervals.hour * 2) return "1 hour ago";
    if (seconds < intervals.day)
        return `${Math.floor(seconds / intervals.hour)} hours ago`;

    if (seconds < intervals.day * 2) return "Yesterday";
    if (seconds < intervals.week)
        return `${Math.floor(seconds / intervals.day)} days ago`;

    if (seconds < intervals.week * 2) return "Last week";
    if (seconds < intervals.month)
        return `${Math.floor(seconds / intervals.week)} weeks ago`;

    if (seconds < intervals.month * 2) return "Last month";
    if (seconds < intervals.year)
        return `${Math.floor(seconds / intervals.month)} months ago`;

    if (seconds < intervals.year * 2) return "Last year";

    return `${Math.floor(seconds / intervals.year)} years ago`;
}