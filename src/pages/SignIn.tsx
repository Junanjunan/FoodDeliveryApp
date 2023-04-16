import React, { useCallback, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({ navigation }: SignInScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null); // TypeScript -> generic: <TextInput | null> 이 설정 안해주면 ref={}으로 해준 부분에 TS 오류 발생
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text) => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback((text) => {
    setPassword(text);
  }, []);

  // 강의에서는 onChangeEmail, onChangePassword를 onChangeText={}안에 넣어서 했는데
  // onChangeEmail 같은거 안하고 그냥 setEmail, setPassword 해도 됨. 왜 이렇게 하는지 확인 or 질문
  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {  // trim : 좌우 공백 없애는 것 ?
      return Alert.alert('알림', '이메일을 입력해주세요')
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요')
    }
    Alert.alert('알림', '로그인 되었습니다')
  }, [])

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const canGoNext = email && password;
  return (
    <View>
      <View>
        <Text>이메일</Text>
        <TextInput style={styles.textInput} placeholder="이메일을 입력해주세요" onChangeText={onChangeEmail}
          value={email}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          ref={emailRef}
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
        />
      </View>
      <View>
        <Text>비밀번호</Text>
        <TextInput style={styles.textInput} placeholder="비밀번호를 입력해주세요" onChangeText={onChangePassword}
          value={password}
          secureTextEntry
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
    </View>
      <View style={styles.buttonZone}>
        <Pressable onPress={onSubmit} style={!canGoNext ? styles.loginButton : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)} disabled={!canGoNext}>
            <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
      </View>
      <View style={styles.buttonZone}>
        <Pressable onPress={toSignUp}>
            <Text>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

// 배열로 스타일 합치는 대신에, StyleSheet.compose(styles.loginButton, styles.loginButtonActive) 를 할수도 있다.
const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    'color': 'white'
  },
  buttonZone: {
    alignItems: 'center'
  }
})

export default SignIn;