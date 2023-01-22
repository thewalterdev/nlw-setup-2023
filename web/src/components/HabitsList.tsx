import * as Popover from '@radix-ui/react-popover'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import dayjs from 'dayjs'

interface HabitsList {
    date: Date
    onCompletedChanged: (completed: number) => void
}

interface HabitsInfo {
    possibleHabitsOnDay: {
        id: string
        title: string
        created_at: string
    }[],
    completedHabits: string[]
}

export function HabitsList({ date, onCompletedChanged }: HabitsList) {

    const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

    useEffect(() => {
        api.get('day', {
            params: {
                date: date.toISOString()
            }
        }).then(res => {
            setHabitsInfo(res.data)
        })
    }, [])

    async function handleTogglehabit(habitId: string) {
        await api.patch(`/habits/${habitId}/toggle`)

        const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId)

        let completedHabits: string[] = []

        if (isHabitAlreadyCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }

        setHabitsInfo({
            possibleHabitsOnDay: habitsInfo!.possibleHabitsOnDay,
            completedHabits
        })

        onCompletedChanged(completedHabits.length)
    }

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

    return (
        <div className="mt-6 flex flex-col gap-y-3">
            {habitsInfo?.possibleHabitsOnDay.map(habit => {
                return (
                    <Checkbox.Root
                        key={habit.id}
                        className='flex items-center gap-x-3 group focus:outline-none disabled:cursor-not-allowed'
                        checked={habitsInfo.completedHabits.includes(habit.id)}
                        onCheckedChange={() => handleTogglehabit(habit.id)}
                        disabled={isDateInPast}
                    >
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-500 group-focus:ring-offset-2 group-focus:ring-offset-background">
                            <Checkbox.Indicator>
                                <Check size={18} className='text-white' />
                            </Checkbox.Indicator>
                        </div>
                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>{habit.title}</span>
                    </Checkbox.Root>
                )
            })}
        </div>
    )
}