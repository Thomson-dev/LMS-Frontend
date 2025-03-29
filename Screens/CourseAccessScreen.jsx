import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import YoutubePlayer from "react-native-youtube-iframe";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import ReviewCard from "../Components/Card/ReviewCard";
import QuestionCard from "../Components/Card/QuestionCard";
import Loader from "../Components/Loading/Loading";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../utils/AxiosIntance";

const SERVER_URI = "https://lms-server-oqfi.onrender.com";

export default function CourseAccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { courseData } = route.params;
  const data = JSON.parse(courseData);

  const [isLoading, setisLoading] = useState(true);
  const [courseContentData, setcourseContentData] = useState([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [activeButton, setActiveButton] = useState("About");
  console.log(activeButton)
  const [isExpanded, setIsExpanded] = useState(false);
  const [quesion, setQuesion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [reviewAvailabe, setreviewAvailabe] = useState(false);

  useEffect(() => {
    const fetchCourseContent = async () => {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");
      try {
        const response = await axiosInstance.get(
          `${SERVER_URI}/api/get-course-content/${data._id}`,
          {
            headers: {
              "access-token": accessToken,
              "refresh-token": refreshToken,
            },
          }
        );
        setcourseContentData(response.data.content);
      } catch (error) {
        console.error("Error fetching course content:", error);
        navigation.navigate("CourseDetails");
      } finally {
        setisLoading(false);
      }
    };

    fetchCourseContent();
  }, [data._id, navigation]);

  const handleQuestionSubmit = () => {
    // Handle question submission logic
    setQuesion("");
    console.log("Question submitted:", quesion);
  };

  const handleReviewSubmit = () => {
    // Handle review submission logic
    setRating(1);
    setReview("");
    console.log("Review submitted:", review, rating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <FontAwesome
            name={i <= rating ? "star" : "star-o"}
            size={25}
            color={"#FF8D07"}
            style={{ marginHorizontal: 4, marginTop: -5 }}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView stickyHeaderIndices={[0]} style={{ flex: 1, padding: 10 }}>
          <View
            style={{ width: "100%", aspectRatio: 16 /10, borderRadius: 10 }}
          >
            {courseContentData[activeVideo]?.videoUrl ? (
              <YoutubePlayer
                height={230}
                play={false}
                fullscreen
                videoId={getYouTubeVideoId(courseContentData[activeVideo].videoUrl)}
              />
            ) : (
              <Text>Loading video...</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.button}
              disabled={activeVideo === 0}
              onPress={() => setActiveVideo(activeVideo - 1)}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Prev
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setActiveVideo(activeVideo + 1)}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {activeVideo + 1}. {courseContentData[activeVideo]?.title}
            </Text>
          </View>
          <View
     
            style={{
              flexDirection: "row",
              marginTop: 25,
              backgroundColor: "#E1E9F8",
              borderRadius: 50,
              gap: 2,
            }}
          >
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 42,
                backgroundColor:
                  activeButton === "Q&A" ? "#2467EC" : "transparent",
                borderRadius: activeButton === "Q&A" ? 50 : 0,
              }}
              onPress={() => {
                console.log("Q&A tab clicked");
                setActiveButton("Q&A");
              }}
             
            >
              <Text
                style={{
                  color: activeButton === "Q&A" ? "#fff" : "#000",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                Q&A
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 42,
                backgroundColor:
                  activeButton === "Reviews" ? "#2467EC" : "transparent",
                borderRadius: activeButton === "Reviews" ? 50 : 0,
              }}
              onPress={() => setActiveButton("Reviews")}
            >
              <Text
                style={{
                  color: activeButton === "Reviews" ? "#fff" : "#000",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                Reviews
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 25,
                backgroundColor:
                  activeButton === "Quiz" ? "#2467EC" : "transparent",
                borderRadius: activeButton === "Quiz" ? 50 : 0,
              }}
              onPress={() => setActiveButton("Quiz")}
            >
              <Text
                style={{
                  color: activeButton === "Quiz" ? "#fff" : "#000",
                  fontFamily: "Nunito_600SemiBold",
                }}
              >
                Quiz
              </Text>
            </TouchableOpacity>
          </View>

          {activeButton === "About" && (
            <View
              style={{
                marginHorizontal: 16,
                marginVertical: 25,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "Raleway_700Bold" }}>
                About course
              </Text>
              <Text
                style={{
                  color: "#525258",
                  fontSize: 16,
                  marginTop: 10,
                  textAlign: "justify",
                  fontFamily: "Nunito_500Medium",
                }}
              >
                {isExpanded
                  ? data?.description
                  : data?.description.slice(0, 302)}
              </Text>
              {data?.description.length > 302 && (
                <TouchableOpacity
                  style={{ marginTop: 3 }}
                  onPress={() => setIsExpanded(!isExpanded)}
                >
                  <Text
                    style={{
                      color: "#2467EC",
                      fontSize: 14,
                    }}
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                    {isExpanded ? "-" : "+"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {activeButton === "Q&A" && (
            <View style={{ flex: 1, margin: 15 }}>
              <View>
                <TextInput
                  value={quesion}
                  onChangeText={setQuesion}
                  placeholder="Ask a question..."
                  style={{
                    marginVertical: 20,
                    flex: 1,
                    textAlignVertical: "top",
                    justifyContent: "flex-start",
                    backgroundColor: "white",
                    borderRadius: 10,
                    height: 100,
                    padding: 10,
                  }}
                  multiline={true}
                />
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <TouchableOpacity
                    style={[styles.button]}
                    disabled={quesion === ""}
                    onPress={() => handleQuestionSubmit()}
                  >
                    <Text
                      style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginBottom: 20 }}>
                {courseContentData[activeVideo]?.questions
                  ?.slice()
                  .reverse()
                  .map((item, index) => (
                    <QuestionCard
                      item={item}
                      key={index}
                      fetchCourseContent={() => {}}
                      courseData={data}
                      contentId={courseContentData[activeVideo]._id}
                    />
                  ))}
              </View>
            </View>
          )}
          {activeButton === "Reviews" && (
            <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
              {!reviewAvailabe && (
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        paddingBottom: 10,
                        paddingLeft: 2,
                        paddingRight: 5,
                      }}
                    >
                      Give one rating:
                    </Text>
                    {renderStars()}
                  </View>

                  <TextInput
                    value={review}
                    onChangeText={setReview}
                    placeholder="Give one review..."
                    style={{
                      flex: 1,
                      textAlignVertical: "top",
                      justifyContent: "flex-start",
                      backgroundColor: "white",
                      borderRadius: 10,
                      height: 100,
                      padding: 10,
                    }}
                    multiline={true}
                  />
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <TouchableOpacity
                      style={[styles.button]}
                      disabled={review === ""}
                      onPress={() => handleReviewSubmit()}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: "600",
                        }}
                      >
                        Submit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View style={{ rowGap: 25 }}>
                {data?.reviews?.map((item, index) => (
                  <ReviewCard item={item} key={index} />
                ))}
              </View>
            </View>
          )}

          {activeButton === "Quiz" && (
            <View style={{ marginHorizontal: 16, marginVertical: 25 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Quiz")}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                >
                  Go to Quiz
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: widthPercentageToDP("35%"),
    height: 35,
    backgroundColor: "#2467EC",
    marginVertical: 10,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});