
function StudentInfo({ student,fn }) {
    // const { student,fn } = props;
    fn();
  return (
    <>
      <div>
        <h2>Student Information</h2>
        <p>Name: {student.name}</p>
        <p>Age: {student.age}</p>
        <p>Major: {student.major}</p>
      </div>
    </>
  )
}

export default StudentInfo
