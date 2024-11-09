import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const tiposAvatar = [
  { nome: 'Aventureiro', tipo: 'adventurer' },
  { nome: 'Avatar', tipo: 'avataaars' },
  { nome: 'Sorridente', tipo: 'big-smile' },
  { nome: 'Cara fechada', tipo: 'open-peeps' },
  { nome: 'Pixel Art', tipo: 'pixel-art' },
];

const gerarUrlAvatarAleatorio = (tipo) => {
  return `https://api.dicebear.com/6.x/${tipo}/svg?seed=${Math.random().toString(36).substring(7)}`;
};

function TelaInicial() {
  const navegacao = useNavigation();

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>IconGenerator</Text>
      <Text style={estilos.descricao}>
        O app perfeito para gerar ícones e avatares aleatórios e divertidos de acordo com o seu nome
      </Text>

      <Text style={estilos.subtitulo}>Selecione um tipo de avatar</Text>

      {tiposAvatar.map((avatar) => (
        <TouchableOpacity
          key={avatar.tipo}
          style={estilos.opcaoAvatar}
          onPress={() => navegacao.navigate('Avatar', { tipoAvatar: avatar.tipo, nomeAvatar: avatar.nome })}
        >
          <SvgUri
            width="40"
            height="40"
            uri={gerarUrlAvatarAleatorio(avatar.tipo)}
            style={estilos.imagemAvatar}
          />
          <Text style={estilos.textoAvatar}>{avatar.nome}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function TelaAvatar({ route }) {
  const { tipoAvatar, nomeAvatar } = route.params;
  const [nome, setNome] = useState('');
  const [urlAvatar, setUrlAvatar] = useState(`https://api.dicebear.com/6.x/${tipoAvatar}/svg?seed=default`);

  const atualizarUrlAvatar = (texto) => {
    setNome(texto);
    setUrlAvatar(`https://api.dicebear.com/6.x/${tipoAvatar}/svg?seed=${texto || 'default'}`);
  };

  return (
    <View style={estilos.containerAvatar}>
      <Text style={estilos.tituloAvatar}>Tipo de avatar: <Text style={estilos.tipoAvatar}>{nomeAvatar}</Text></Text>
      <Text style={estilos.descricao}>Informe o seu nome no campo abaixo para gerarmos um novo avatar de acordo com você!</Text>
      
      <TextInput
        style={estilos.input}
        placeholder="Informe o seu nome"
        placeholderTextColor="#CCCCCC"
        value={nome}
        onChangeText={atualizarUrlAvatar}
      />

      <SvgUri width="150" height="150" uri={urlAvatar} style={estilos.imagemAvatar} />
    </View>
  );
}

const Navigation = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navigation.Navigator>
        <Navigation.Screen name="Home" component={TelaInicial} options={{ headerShown: false }} />
        <Navigation.Screen name="Avatar" component={TelaAvatar} />
      </Navigation.Navigator>
    </NavigationContainer>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  titulo: {
    color: '#1E90FF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 48,
    marginBottom: 10,
  },
  descricao: {
    color: '#CCCCCC',
    fontSize: 16,
    marginBottom: 30,
  },
  subtitulo: {
    color: '#CCCCCC',
    fontSize: 18,
    marginBottom: 10,
  },
  opcaoAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  imagemAvatar: {
    marginRight: 10,
  },
  textoAvatar: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10
  },
  containerAvatar: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  tituloAvatar: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipoAvatar: {
    color: '#1E90FF',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#1E90FF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  imagemAvatar: {
    marginTop: 20,
  },
});
