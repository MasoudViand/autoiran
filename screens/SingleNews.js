// @flow
import auth from "@react-native-firebase/auth";
import _ from "lodash";
import React, { Component } from "react";
import { View, Keyboard, Alert, TouchableOpacity, Image } from "react-native";
//import { Card, SimpleCard } from "@paraboly/react-native-card";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from "native-base";

class SingleNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      user: [],
      isTyping: true,
      renderUsernameOnMessage: true,
      isLogged: false,
    };
    this.navigate = this.props.navigation.navigate;
  }
  render() {
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          <Card style={{ flex: 1 }}>
            <CardItem>
              <Body>
                <Text
                  style={{
                    writingDirection: "rtl",
                    lineHeight: 25,
                    fontFamily: "Shabnam-Bold",
                    textAlign: "justify",
                  }}
                >
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است.
                </Text>
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Image
                  source={{ uri: "https://picsum.photos/200" }}
                  style={{ height: 200, width: "100%", flex: 1 }}
                />
                <Text
                  style={{
                    writingDirection: "rtl",
                    textAlign: "justify",
                    paddingTop: 15,
                    lineHeight: 26,
                    fontFamily: "Shabnam-Light",
                  }}
                >
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                  آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
                  صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                  راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل
                  حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای
                  موجود طراحی اساسا مورد استفاده قرار گیرد.
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  {/* <Icon name="logo-github" /> */}
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default SingleNews;
