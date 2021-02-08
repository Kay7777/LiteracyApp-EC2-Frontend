import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/useractions";
import ErrorBoundary from "./components/errorboundary/errorboundary";
import axios from "axios";
import Header from "./components/header/header";
const Main = lazy(() => import("./pages/mainpage/mainpage"));
// Student pages
// Fluency pages
const FluencyMain = lazy(() => import("./pages/studentpage/fluency/main"));
const FluencyMaterials = lazy(() =>
  import("./pages/studentpage/fluency/materials")
);
const FluencyAssignment = lazy(() =>
  import("./pages/studentpage/fluency/assignment")
);
// Phoneme pages
const PhonemeMain = lazy(() => import("./pages/studentpage/phoneme/main"));
const PhonemeMaterials = lazy(() =>
  import("./pages/studentpage/phoneme/materials")
);
const PhonemeAssignment = lazy(() =>
  import("./pages/studentpage/phoneme/assignment")
);
// Print pages
const PrintMain = lazy(() => import("./pages/studentpage/print/main"));
const PrintMaterials = lazy(() =>
  import("./pages/studentpage/print/materials")
);
const PrintAssignment = lazy(() =>
  import("./pages/studentpage/print/assignment")
);

// Meaning pages
const MeaningMain = lazy(() => import("./pages/studentpage/meaning/main"));
const MeaningMaterials = lazy(() =>
  import("./pages/studentpage/meaning/materials")
);
const MeaningAssignment = lazy(() =>
  import("./pages/studentpage/meaning/assignment")
);

// Tutor pages
const TutorSignIn = lazy(() => import("./pages/tutorpage/tutor-signin-page"));

// Fluency pages
const FluencyTutorMain = lazy(() => import("./pages/tutorpage/fluency/main"));
const FluencyTutorTestData = lazy(() => import("./pages/tutorpage/fluency/test-data"));
const FluencyTutorTrainData = lazy(() => import("./pages/tutorpage/fluency/train-data"));
const FluencyTutorTestAllAssign = lazy(() =>
  import("./pages/tutorpage/fluency/all-test")
);
const FluencyTutorTestOneAssign = lazy(() =>
  import("./pages/tutorpage/fluency/one-test")
);
const FluencyTutorTrainAllAssign = lazy(() =>
  import("./pages/tutorpage/fluency/all-assign")
);
const FluencyTutorTrainOneAssign = lazy(() =>
  import("./pages/tutorpage/fluency/one-assign")
);
const FluencyTutorAllPerformance = lazy(() =>
  import("./pages/tutorpage/fluency/all-performance")
);
const FluencyTutorOnePerformance = lazy(() =>
  import("./pages/tutorpage/fluency/one-performance")
);
const FluencyTutorMaterials = lazy(() =>
  import("./pages/tutorpage/fluency/materials")
);

// Phoneme Page
const PhonemeTutorMain = lazy(() => import("./pages/tutorpage/phoneme/main"));
const PhonemeTutorPhonemeData = lazy(() =>
  import("./pages/tutorpage/phoneme/phoneme-data")
);
const PhonemeTutorAudioData = lazy(() =>
  import("./pages/tutorpage/phoneme/audio-data")
);
const PhonemeTutorAllAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/all-assign")
);
const PhonemeTutorOneAssign = lazy(() =>
  import("./pages/tutorpage/phoneme/one-assign")
);
const PhonemeTutorAllTest = lazy(() =>
  import("./pages/tutorpage/phoneme/all-test")
);
const PhonemeTutorOneTest = lazy(() =>
  import("./pages/tutorpage/phoneme/one-test")
);
const PhonemeTutorAllPerformance = lazy(() =>
  import("./pages/tutorpage/phoneme/all-performance")
);
const PhonemeTutorOnePerformance = lazy(() =>
  import("./pages/tutorpage/phoneme/one-performance")
);
const PhonemeTutorMaterials = lazy(() =>
  import("./pages/tutorpage/phoneme/materials")
);
const PhonemeTutorMultipleData = lazy(()=>
  import("./pages/tutorpage/phoneme/multiple-choice-data")
);
const PhonemeTutorShortData = lazy(()=>
  import("./pages/tutorpage/phoneme/short-answer-data")
);
const PhonemeTutorBlankData = lazy(()=>
  import("./pages/tutorpage/phoneme/blank-data")
);

// Print Page
const PrintTutorMain = lazy(() => import("./pages/tutorpage/print/main"));
const PrintTutorShortData = lazy(() => import("./pages/tutorpage/print/short-answer-data"));
const PrintTutorMultipleData = lazy(() => import("./pages/tutorpage/print/multiple-choice-data"));
const PrintTutorBlankData = lazy(() => import("./pages/tutorpage/print/blank-data"));
const PrintTutorAllTest = lazy(() =>
  import("./pages/tutorpage/print/all-test")
);
const PrintTutorOneTest = lazy(() =>
  import("./pages/tutorpage/print/one-test")
);
const PrintTutorAllAssign = lazy(() =>
  import("./pages/tutorpage/print/all-assign")
);
const PrintTutorOneAssign = lazy(() =>
  import("./pages/tutorpage/print/one-assign")
);
const PrintTutorAllPerform = lazy(() =>
  import("./pages/tutorpage/print/all-performance")
);
const PrintTutorOnePerform = lazy(() =>
  import("./pages/tutorpage/print/one-performance")
);
const PrintTutorMaterials = lazy(() =>
  import("./pages/tutorpage/print/materials")
);

// Meaning Page
const MeaningTutorMain = lazy(() => import("./pages/tutorpage/meaning/main"));
const MeaningTutorShortData = lazy(() =>
  import("./pages/tutorpage/meaning/short-answer-data")
);
const MeaningTutorBlankData = lazy(() =>
  import("./pages/tutorpage/meaning/blank-data")
);
const MeaningTutorMultipleChoiceData = lazy(() =>
  import("./pages/tutorpage/meaning/multiple-choice-data")
);
const MeaningTutorAllTest = lazy(() =>
  import("./pages/tutorpage/meaning/all-test")
);
const MeaningTutorOneTest = lazy(() =>
  import("./pages/tutorpage/meaning/one-test")
);
const MeaningTutorAllAssign = lazy(() =>
  import("./pages/tutorpage/meaning/all-assign")
);
const MeaningTutorOneAssign = lazy(() =>
  import("./pages/tutorpage/meaning/one-assign")
);
const MeaningTutorAllPerform = lazy(() =>
  import("./pages/tutorpage/meaning/all-performance")
);
const MeaningTutorOnePerform = lazy(() =>
  import("./pages/tutorpage/meaning/one-performance")
);
const MeaningTutorMaterials = lazy(() =>
  import("./pages/tutorpage/meaning/materials")
);

class App extends React.Component {
  componentDidMount = async () => {
    const doc = await axios.get("/api/current_user");
    this.props.setCurrentUser(doc.data);
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Route exact path="/" component={Main} />
              <Route exact path="/tutor/signin" component={TutorSignIn} />
              {/* Student Fluency */}
              <Route exact path="/student/fluency" component={FluencyMain} />
              <Route
                exact
                path="/student/fluency/learning"
                component={FluencyMaterials}
              />
              <Route
                exact
                path="/student/fluency/assignment"
                component={FluencyAssignment}
              />
              {/* Student Phoneme */}
              <Route exact path="/student/phoneme" component={PhonemeMain} />
              <Route
                exact
                path="/student/phoneme/learning"
                component={PhonemeMaterials}
              />
              <Route
                exact
                path="/student/phoneme/assignment"
                component={PhonemeAssignment}
              />
              {/* Student Meaning */}
              <Route exact path="/student/meaning" component={MeaningMain} />
              <Route
                exact
                path="/student/meaning/learning"
                component={MeaningMaterials}
              />
              <Route
                exact
                path="/student/meaning/assignment"
                component={MeaningAssignment}
              />
              {/* Student Print */}
              <Route exact path="/student/print" component={PrintMain} />
              <Route
                exact
                path="/student/print/learning"
                component={PrintMaterials}
              />
              <Route
                exact
                path="/student/print/assignment"
                component={PrintAssignment}
              />
              {/* Tutor Fluency */}
              <Route exact path="/tutor/fluency" component={FluencyTutorMain} />
              <Route
                exact
                path="/tutor/fluency/testdata"
                component={FluencyTutorTestData}
              />
              <Route
                exact
                path="/tutor/fluency/traindata"
                component={FluencyTutorTrainData}
              />
              <Route
                exact
                path="/tutor/fluency/test"
                component={FluencyTutorTestAllAssign}
              />
              <Route
                path="/tutor/fluency/test/:id"
                component={FluencyTutorTestOneAssign}
              />
              <Route
                exact
                path="/tutor/fluency/assign"
                component={FluencyTutorTrainAllAssign}
              />
              <Route
                path="/tutor/fluency/assign/:id"
                component={FluencyTutorTrainOneAssign}
              />
              <Route
                exact
                path="/tutor/fluency/performance"
                component={FluencyTutorAllPerformance}
              />
              <Route
                path="/tutor/fluency/performance/:id"
                component={FluencyTutorOnePerformance}
              />
              {/* Tutor Phoneme */}
              <Route exact path="/tutor/phoneme" component={PhonemeTutorMain} />
              <Route
                exact
                path="/tutor/phoneme/audiodata"
                component={PhonemeTutorAudioData}
              />
              <Route
                exact
                path="/tutor/phoneme/phonemedata"
                component={PhonemeTutorPhonemeData}
              />
              <Route
                exact
                path="/tutor/phoneme/assign"
                component={PhonemeTutorAllAssign}
              />
              <Route
                path="/tutor/phoneme/assign/:id"
                component={PhonemeTutorOneAssign}
              />
              <Route
                exact
                path="/tutor/phoneme/test"
                component={PhonemeTutorAllTest}
              />
              <Route
                path="/tutor/phoneme/test/:id"
                component={PhonemeTutorOneTest}
              />
              <Route
                exact
                path="/tutor/phoneme/performance"
                component={PhonemeTutorAllPerformance}
              />
              <Route
                path="/tutor/phoneme/performance/:id"
                component={PhonemeTutorOnePerformance}
              />
              <Route 
                path="/tutor/phoneme/multiple"
                component={PhonemeTutorMultipleData}
              />
              <Route 
                path="/tutor/phoneme/short"
                component={PhonemeTutorShortData}
              />
               <Route 
                path="/tutor/phoneme/blank"
                component={PhonemeTutorBlankData}
              />
              {/* Tutor Print */}
              <Route exact path="/tutor/print/" component={PrintTutorMain} />
              <Route
                exact
                path="/tutor/print/short"
                component={PrintTutorShortData}
              />
              <Route
                exact
                path="/tutor/print/multiple"
                component={PrintTutorMultipleData}
              />
              <Route
                exact
                path="/tutor/print/blank"
                component={PrintTutorBlankData}
              />
              <Route
                exact
                path="/tutor/print/test"
                component={PrintTutorAllTest}
              />
              <Route
                path="/tutor/print/test/:id"
                component={PrintTutorOneTest}
              />
              <Route
                exact
                path="/tutor/print/assign"
                component={PrintTutorAllAssign}
              />
              <Route
                path="/tutor/print/assign/:id"
                component={PrintTutorOneAssign}
              />
              <Route
                exact
                path="/tutor/print/performance"
                component={PrintTutorAllPerform}
              />
              <Route
                path="/tutor/print/performance/:id"
                component={PrintTutorOnePerform}
              />
                 {/* Tutor Meaning */}
              <Route
                exact
                path="/tutor/meaning/"
                component={MeaningTutorMain}
              />
              <Route
                exact
                path="/tutor/meaning/short"
                component={MeaningTutorShortData}
              />
              <Route
                exact
                path="/tutor/meaning/blank"
                component={MeaningTutorBlankData}
              />
              <Route
                exact
                path="/tutor/meaning/multiple"
                component={MeaningTutorMultipleChoiceData}
              />
              <Route
                exact
                path="/tutor/meaning/test"
                component={MeaningTutorAllTest}
              />
              <Route
                path="/tutor/meaning/test/:id"
                component={MeaningTutorOneTest}
              />
              <Route
                exact
                path="/tutor/meaning/assign"
                component={MeaningTutorAllAssign}
              />
              <Route
                path="/tutor/meaning/assign/:id"
                component={MeaningTutorOneAssign}
              />
              <Route
                exact
                path="/tutor/meaning/performance"
                component={MeaningTutorAllPerform}
              />
              <Route
                path="/tutor/meaning/performance/:id"
                component={MeaningTutorOnePerform}
              />
                 {/* Tutor Fluency */}
              <Route
                path="/tutor/fluency/materials"
                component={FluencyTutorMaterials}
              />
              <Route
                path="/tutor/print/materials"
                component={PrintTutorMaterials}
              />
              <Route
                path="/tutor/meaning/materials"
                component={MeaningTutorMaterials}
              />
              <Route
                path="/tutor/phoneme/materials"
                component={PhonemeTutorMaterials}
              />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
