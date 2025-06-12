from sentence_transformers import SentenceTransformer, util

def check_similarity(title1: str, title2: str, model:SentenceTransformer) -> float:
    """
    Check the similarity between two titles using a pre-trained SentenceTransformer model.
    
    Args:
        title1 (str): The first title to compare.
        title2 (str): The second title to compare.
        model (SentenceTransformer): The pre-trained SentenceTransformer model.
        
    Returns:
        float: The cosine similarity score between the two titles.
    """
    embeddings = model.encode([title1, title2], convert_to_tensor=True)
    cosine_score = util.pytorch_cos_sim(embeddings[0], embeddings[1])
    return float(cosine_score)

if __name__ == "__main__":
    # Example usage
    print("Checking similarity between two titles...")
    model = SentenceTransformer('sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    title1 = "Video | Avión de Air India con 242 pasajeros se estrelló en comedor de una facultad: Víctimas podrían aumentar"
    title2 = "VIDEO | Impactante registro muestra el momento en que avión con 240 pasajeros se estrella al despegar en India"
    score = check_similarity(title1, title2, model)
    print(f"Similarity Score: {score}")