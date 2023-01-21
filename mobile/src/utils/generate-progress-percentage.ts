export function GenerateProgressPercentage(completed: number, total: number) {
    return Math.round((completed / total) * 100)
}