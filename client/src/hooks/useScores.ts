import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

type Params = {
  category?: string;
  type?: string;
  difficulty?: string;
  userId: string | undefined;
  score: number;
  questionsCount: number;
};

export type Scores = {
  category: string;
  createdAt: string;
  difficulty: string;
  questionsCount: number;
  score: number;
  type: string;
  updatedAt: string;
  userId: string;
  marksId: string;
};
export type ScoreResponseData = {
  results: Scores[];
  success: boolean;
};
const saveQuizScore = async (params: Params) => {
  try {
    await fetch(`/api/scores/save-score`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
  } catch (e) {
    console.log(e);
  }
};

const getScores = async (_id: string) => {
  try {
    const response = await fetch(`/api/scores/get-scores/${_id}`);
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

const getTopScores = async () => {
  try {
    const response = await fetch(`/api/scores/get-top-scores/`);
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

const useSaveScore = () => {
  const queryClient = new QueryClient();
  const mutation = useMutation({
    mutationFn: saveQuizScore,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["save-scores"] });
    },
  });
  return { mutation };
};

const useGetScores = (id: string | undefined) => {
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["scores", id],

    //staleTime: 1000 * 60 * 5, // 5 minutes

    queryFn: () => getScores(id as string),
  });

  return { data, isFetching, error, isPending };
};

const useGetTopScores = () => {
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["scores"],

    //staleTime: 1000 * 60 * 5, // 5 minutes

    queryFn: () => getTopScores(),
  });

  return { data, isFetching, error, isPending };
};

export { useGetScores, useSaveScore, useGetTopScores };
