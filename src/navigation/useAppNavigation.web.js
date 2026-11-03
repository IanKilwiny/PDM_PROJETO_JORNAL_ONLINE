import { useLocation, useNavigate, useParams } from 'react-router';

export function useAppNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  return {
    id,
    goBack: () => {
      const previousPath = location.state?.from;
      navigate(previousPath || '/', { replace: !previousPath });
    },
    openArticle: (articleId) =>
      navigate(`/news/${encodeURIComponent(articleId)}`, {
        state: { from: location.pathname },
      }),
  };
}
