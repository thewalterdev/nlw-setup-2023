import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const avaiableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
]

export function NewHabit() {

    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    function handleToggleWeekDay(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    async function handleCreateNewHabit() {
        try {
            if (!title.trim() || weekDays.length === 0) {
                Alert.alert('Novo hábito', 'Informe o nome do hábito e escolha o período.')
            }

            await api.post('/habits', {title, weekDays})
            setTitle('')
            setWeekDays([])
        } catch (error) {
            console.log(error)
            Alert.alert('Oops!', 'Não foi possível criar o novo hábito.')
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <BackButton />

                <Text className="mt-6 text-white font-bold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento?
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-violet-600"
                    placeholder="ex.: Exercícios, beber água, etc..."
                    placeholderTextColor={colors.zinc['400']}
                    onChangeText={text => setTitle(text)}
                    value={title}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    Qual a recorrência?
                </Text>

                {avaiableWeekDays.map((weekDay, i) => {
                    return (
                        <CheckBox
                            key={`${weekDay}-${i}`}
                            title={weekDay}
                            onPress={() => handleToggleWeekDay(i)}
                            checked={weekDays.includes(i)} />
                    )
                })}

                <TouchableOpacity className="w-full h-14 flex-row justify-center items-center bg-green-600 rounded-md mt-6" activeOpacity={0.7} onPress={handleCreateNewHabit}>
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}