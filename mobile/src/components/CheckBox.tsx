import { Text, TouchableOpacity, View, TouchableOpacityProps } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface CheckboxProps extends TouchableOpacityProps {
    checked?: boolean
    title: string
}

export function CheckBox({ checked = false, title, ...rest }: CheckboxProps) {

    return (
        <TouchableOpacity activeOpacity={0.7} className='flex-row mb-2 items-center' {...rest}>
            { checked ?
                <Animated.View className="w-8 h-8 bg-green-500 rounded-lg items-center justify-center" entering={ZoomIn} exiting={ZoomOut}>
                    <Feather name="check" size={20} color={colors.white} />
                </Animated.View>
                :
                <View className="w-8 h-8 bg-zinc-900 rounded-lg"></View>
            }
            <Text className="text-white text-base ml-3">
                {title}
            </Text>
        </TouchableOpacity>
    )
}