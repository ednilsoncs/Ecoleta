import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MailComposer from 'expo-mail-composer';
import styles from './styles';
import api from '../../services/api';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState<Data>({} as Data);

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
    });
  });
  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleSendWhatsapp = () => {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho enteresse na coleta de residuos`,
    );
  };
  const handleComposeMail = () => {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  };
  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri: data.point.image_url,
          }}
        />
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city},{data.point.uf}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleSendWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <Text style={styles.button}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <FontAwesome name="mail" size={20} color="#FFF" />
          <Text style={styles.button}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

export default Detail;
