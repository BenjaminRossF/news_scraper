import pytest
from sentence_transformers import SentenceTransformer, util
from src.similarity.helper.check_similarity import check_similarity

class TestCheckSimilarity:

    @pytest.mark.parametrize("title1, title2", [
        (
            "Video | Avión de Air India con 242 pasajeros se estrelló en comedor de una facultad: Víctimas podrían aumentar",
            "VIDEO | Impactante registro muestra el momento en que avión con 240 pasajeros se estrella al despegar en India"
        ),
        (
            "Un nuevo estudio revela los beneficios del ejercicio regular",
            "Investigación reciente destaca la importancia de mantenerse activo"
        ),
        (
            "El clima hoy será soleado con algunas nubes",
            "Pronóstico del tiempo: Sol y nubes dispersas"
        )
    ])
    def test_check_similarity(self, title1, title2):
        # Assuming the model is loaded within the function
        model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
        score = check_similarity(title1, title2, model)

        # Check if the score is a float
        assert isinstance(score, float)

        # Check if the score is between 0 and 1
        assert 0 <= score <= 1

    def test_consistence_similarity(self):
        title1 = "Video | Avión de Air India con 242 pasajeros se estrelló en comedor de una facultad: Víctimas podrían aumentar"
        title2 = "VIDEO | Impactante registro muestra el momento en que avión con 240 pasajeros se estrella al despegar en India"
        model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')

        # Get the score for the first time
        score1 = check_similarity(title1, title2, model)

        # Get the score again to check for consistency
        score2 = check_similarity(title1, title2, model)

        # The scores should be the same
        assert score1 == score2