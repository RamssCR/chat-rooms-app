export function formatTime() {
    const time = new Date()
    
    const hours = time.getHours()
    const minutes = time.getMinutes()

    const formatHours = String(hours).padStart(2, '0')
    const formatMinutes = String(minutes).padStart(2, '0')

    return `${formatHours}:${formatMinutes}`
}