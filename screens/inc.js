import firebase from "@react-native-firebase/app";
import { Toast } from "native-base";
import uuid from "uuid";
import moment from "jalali-moment";
import "moment/min/locales";
export const like = async (userId, postId) => {
  let updateObj = {
    users: firebase.firestore.FieldValue.arrayUnion(userId),
  };
  try {
    await firebase
      .firestore()
      .collection("likes")
      .doc(postId)
      .set(updateObj, { merge: true })
      .then(
        Toast.show({
          text: "Liked!",
          type: "success",
        })
      );
  } catch (error) {
    Toast.show({
      text: "خطایی رخ داد",
      type: "danger",
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
    });
  }
};

export const addComment = async (userId, postId, text) => {
  const id = uuid.v4();
  const time = moment().unix();
  comment = {
    commentId: id,
    userId: userId,
    text: text,
    date: time,
  };
  let updateObj = {
    users: firebase.firestore.FieldValue.arrayUnion(comment),
  };
  try {
    await firebase
      .firestore()
      .collection("comments")
      .doc(postId)
      //.set(updateObj, { merge: true })
      .set(updateObj)
      .then(
        Toast.show({
          text: "Posted!",
          type: "success",
        })
      );
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (postId) => {
  try {
    const user = await firebase
      .firestore()
      .doc(`comments/${postId}`)
      .get()
      .then(function(user) {
        var commentObj;
        const fieldPath = new firebase.firestore.FieldPath("comments");
        let comments = user.get(fieldPath);
        if (comments) {
          commentObj = { count: comments.length, comments: comments };
        } else {
          commentObj = { count: 0, comments: [] };
        }
        // console.log("Likes", likeObj);
        return commentObj;
      });
    return user;
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