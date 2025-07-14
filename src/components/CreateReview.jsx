import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import ReviewForm from "./ReviewForm";
import { CREATE_REVIEW } from "../graphql/queries";

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          ownerName,
          repositoryName,
          rating: Number(rating),
          text,
        },
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log("Create review error", e.message);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
