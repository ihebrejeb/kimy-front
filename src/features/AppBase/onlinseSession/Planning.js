import { useHistory } from "react-router";

export default function Planning({ courseId }) {
  const history = useHistory();
  const createOS = async () => {
    history.push(`/video/${courseId}`);
  };
  return (
    <>
      <button onClick={createOS}>Create an online session</button>
    </>
  );
}
