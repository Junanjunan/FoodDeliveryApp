import React, { useCallback, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((text) => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback((text) => {
    setPassword(text);
  }, []);

  // 강의에서는 onChangeEmail, onChangePassword를 onChangeText={}안에 넣어서 했는데
  // onChangeEmail 같은거 안하고 그냥 setEmail, setPassword 해도 됨. 왜 이렇게 하는지 확인 or 질문
  const onSubmit = useCallback(() => {
    Alert.alert('알림', '안녕~')
  }, [])

  const canGoNext = email && password;
  return (
    <View>
      <View>
        <Text>이메일</Text>
        <TextInput style={styles.textInput} placeholder="이메일을 입력해주세요" onChangeText={onChangeEmail}/>
      </View>
      <View>
        <Text>비밀번호</Text>
        <TextInput style={styles.textInput} placeholder="비밀번호를 입력해주세요" onChangeText={onChangePassword}/>
    </View>
      <View style={styles.buttonZone}>
        <Pressable onPress={onSubmit} style={!canGoNext ? styles.loginButton : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)} disabled={!canGoNext}>
            <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
      </View>
      <View style={styles.buttonZone}>
        <Pressable>
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