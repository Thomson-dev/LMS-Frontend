import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import Results from "./Results";
import Option from "./Option";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function QuizComponent() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [checkIfSelected, setCheckIfSelected] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  console.log(questions)

  useEffect(() => {
    // Fetch quiz data from API
    const fetchQuizData = async () => {
      try {
        // Retrieve tokens from AsyncStorage
        const accessToken = await AsyncStorage.getItem("access_token");
        const refreshToken = await AsyncStorage.getItem("refresh_token");
  
        if (!accessToken || !refreshToken) {
          console.error("Tokens are missing. Redirecting to login...");
          navigation.navigate("Login"); // Redirect to login screen
          return;
        }
  
        // Make the API call with the tokens in the headers
        const response = await axios.get("https://lms-server-oqfi.onrender.com/api/quizzes", 

          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "refresh-token": refreshToken,
            },
          }


        );
  
        if (response.data.success) {
          setQuestions(response.data.quizzes);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error.response?.data?.message || error.message);
  
      
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
  
  
    fetchQuizData();
  }, []);

  let currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let percentage = ((currentQuestionIndex + 1) / questions?.length) * 100;
    setPercentageComplete(percentage);
  }, [currentQuestionIndex]);

  const handleNext = () => {
    let correctAnswer = currentQuestion?.options.find((option) => option.isCorrect)?.option;

    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestionIndex < questions?.length - 1) {
      setCurrentQuestionIndex((prevQuestion) => prevQuestion + 1);
    } else {
      setShowResult(true);
    }

    setCheckIfSelected({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    });
  };

  const checkOption = (optionIndex) => {
    const newCheckIfSelected = {
      option1: false,
      option2: false,
      option3: false,
      option4: false,
    };
    newCheckIfSelected[`option${optionIndex}`] = true;
    setCheckIfSelected(newCheckIfSelected);
  };
  console.log("Current Question Options:", currentQuestion?.options);

  const restart = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowResult(false);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2467EC" />
      </View>
    );
  }

  if (showResult) return <Results restart={restart} score={score} />;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View style={styles.countwrapper}>
          <Text style={{ fontWeight: "600" }}>
            {currentQuestionIndex + 1}/{questions?.length}
          </Text>
        </View>

        <View style={styles.questionwrapper}>
          <View style={styles.progresswrapper}>
            <View style={[styles.progressBar, { width: `${percentageComplete}%` }]}></View>
            <View style={styles.progresscount}>
              <Text style={styles.percentage}>{Math.round(percentageComplete)}%</Text>
            </View>
          </View>

          <Text style={{ fontWeight: "500", textAlign: "center" }}>{currentQuestion?.question}</Text>
        </View>

        <View style={styles.optionswrapper}>
          {currentQuestion?.options.map((option, index) => (
            <Option
              key={option._id}
              setSelectedOption={setSelectedOption}
              checkIfSelected={() => checkOption(index + 1)}
              isSelected={checkIfSelected[`option${index + 1}`]}
              option={option.option}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={[styles.btn, { opacity: selectedOption ? 1 : 0.5 }]}
          disabled={!selectedOption}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Next</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e4e4e4",
    padding: 20,
  },
  countwrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  questionwrapper: {
    marginTop: 60,
    width: "100%",
    height: 180,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    alignItems: "center",
  },
  progresswrapper: {
    width: 70,
    height: 70,
    backgroundColor: "#ABD1C6",
    borderRadius: 50,
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    marginBottom: 30,
    marginTop: -50,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2467EC",
    alignSelf: "flex-end",
  },
  progresscount: {
    height: 58,
    width: 58,
    borderRadius: 50,
    backgroundColor: "#fff",
    zIndex: 10,
    position: "absolute",
    top: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  percentage: {
    fontWeight: "600",
    fontSize: 18,
    color: "#004643",
  },
  optionswrapper: {
    marginTop: 40,
    width: "100%",
  },
  btn: {
    width: "100%",
    height: 50,
    borderRadius: 16,
    backgroundColor: "#2467EC",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});