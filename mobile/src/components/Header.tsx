import Logo from '../assets/logo.svg'
import { View, TouchableOpacity, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import colors from 'tailwindcss/colors'

export function Header() {

    const { navigate } = useNavigation()

    return (
        <View className='w-full flex-row items-center justify-between'>
            <Logo />
            <TouchableOpacity
                activeOpacity={0.7}
                className="border border-violet-500 rounded-lg flex-row h-11 px-4 items-center gap-x-1"
                onPress={() => navigate('new')}
            >
                <Feather
                    name='plus'
                    size={20}
                    color={colors.violet[500]}
                />
                <Text className="text-white font-semibold text-base">
                    Novo hábito
                </Text>
            </TouchableOpacity>
        </View>
    )
}