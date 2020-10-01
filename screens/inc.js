import firebase from "@react-native-firebase/app";
import { Toast } from "native-base";
import uuid from "uuid";
import moment from "jalali-moment";
import "moment/min/locales";
import { Keyboard } from "react-native";
import style from "./css/styles";
export const like = async (userId, postId, isLiked) => {
  let updateObj = {};
  if (isLiked) {
    updateObj = {
      users: firebase.firestore.FieldValue.arrayRemove(userId),
    };
  } else {
    updateObj = {
      users: firebase.firestore.FieldValue.arrayUnion(userId),
    };
  }

  try {
    await firebase
      .firestore()
      .collection("likes")
      .doc(postId)
      .set(updateObj, { merge: true });
    // .then(
    //   Toast.show({
    //     text: "لایک شما ثبت شد",
    //     type: "success",
    //     textStyle: style.toasttext,
    //   })
    // );
  } catch (error) {
    Toast.show({
      text: "خطایی رخ داد",
      type: "danger",
      textStyle: style.toasttext,
    });
    console.log(error);
  }
};

export const likeSize = async (postId, userId) => {
  try {
    const user = await firebase
      .firestore()
      .doc(`likes/${postId}`)
      .get()
      .then(function(user) {
        var likeObj;
        const fieldPath = new firebase.firestore.FieldPath("users");
        let likes = user.get(fieldPath);
        if (likes) {
          var liked = likes.indexOf(userId) > -1;
          likeObj = { count: likes.length, liked: liked };
        } else {
          likeObj = { count: 0, liked: false };
        }
        // console.log("Likes", likeObj);
        return likeObj;
      });
    return user;
    // Create a new field path
  } catch (e) {
    console.error(e);
    Toast.show({
      text: "خطایی رخ داد",
      type: "danger",
      textStyle: style.toasttext,
    });
  }
};

export const addComment = async (user, postId, text) => {
  if (text) {
    const id = uuid.v4();
    const time = moment().unix();
    let comment = {
      commentId: id,
      user: user,
      text: text,
      date: time,
    };
    let updateObj = {
      comments: firebase.firestore.FieldValue.arrayUnion(comment),
    };
    try {
      await firebase
        .firestore()
        .collection("comments")
        .doc(postId)
        .set(updateObj, { merge: true })
        //.set(updateObj)
        .then(
          Toast.show({
            text: "نظر شما ثبت شد",
            type: "success",
            textStyle: style.toasttext,
          })
        );
    } catch (error) {
      console.log(error);
    }
  } else {
    Toast.show({
      text: "لطفا متن خود را وارد کنید",
      type: "danger",
      textStyle: style.toasttext,
    });
  }
};

export const getComments = async (postId) => {
  try {
    const comments = await firebase
      .firestore()
      .doc(`comments/${postId}`)
      //.orderBy("date", "desc")
      .get()
      .then(function(comments) {
        //console.log(comments);
        var commentObj;
        const fieldPath = new firebase.firestore.FieldPath("comments");
        let commentsList = comments.get(fieldPath);
        if (commentsList) {
          commentObj = { count: commentsList.length, comments: commentsList };
        } else {
          commentObj = { count: 0, comments: [] };
        }
        // console.log("Likes", likeObj);
        return commentObj;
      });
    return comments;
    // Create a new field path
  } catch (e) {
    console.error(e);
  }
};
export const farsiDate = (date) => {
  let b = moment.unix(date);
  let a = moment();
  let diff = a.diff(b, "hours");
  let shamsi = moment
    .unix(date)
    .locale("fa")
    .fromNow();
  if (diff > 24) {
    // alert("1");
    shamsi = moment
      .unix(date)
      .locale("fa")
      .format("D MMMM YYYY, HH:mm");
  } else {
    // alert("2");
    shamsi = moment
      .unix(date)
      .locale("fa")
      .fromNow();
  }

  return shamsi;
};
