from fastapi import APIRouter, HTTPException, Query
from sentence_transformers import SentenceTransformer
from helper.check_similarity import check_similarity

router = APIRouter()

@router.get("/similarity")
def check_similarity(text1: str = Query(...), text2: str = Query(...)):
    """
    Check the similarity between two titles.
    
    Args:
        text1 (str): The first title to compare.
        text2 (str): The second title to compare.
        
    Returns:
        float: The cosine similarity score between the two titles.
    """
    try:
        model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
        score = check_similarity(text1, text2, model)
        return {"similarity_score": score}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))