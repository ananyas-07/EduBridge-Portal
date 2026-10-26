# EduBridge - Machine Learning Course Recommendation Engine
# Uses TF-IDF Vectorization & Cosine Similarity to rank Free and Paid courses equally

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

# 1. Unified Dataset of Free & Paid Courses
courses_data = [
    {"id": 1, "title": "Striver A2Z C++ DSA Course", "type": "Free", "price": "₹0", "tags": "c++ data structures algorithms arrays trees graphs dynamic programming coding interview"},
    {"id": 2, "title": "Abdul Bari Mastering C and C++ DSA", "type": "Paid", "price": "₹499", "tags": "c c++ pointers recursion memory allocation sorting trees university exams"},
    {"id": 3, "title": "DeepLearning.AI Machine Learning Specialization", "type": "Paid", "price": "₹2499", "tags": "machine learning python supervised learning neural networks recommender systems scikit-learn"},
    {"id": 4, "title": "NPTEL IIT Madras Intro to Machine Learning", "type": "Free", "price": "₹0", "tags": "machine learning linear regression svm clustering probability academic iit free"},
    {"id": 5, "title": "Creator Cohort Full-Stack Web Dev", "type": "Paid", "price": "₹999", "tags": "html css javascript react nodejs express mongodb full-stack web development"},
    {"id": 6, "title": "University of Helsinki Full Stack Open", "type": "Free", "price": "₹0", "tags": "react nodejs express mongodb typescript graphql free certificate web development"}
]

df = pd.DataFrame(courses_data)

def recommend_courses(student_query, free_only=False):
    # Filter by budget constraint if requested
    working_df = df[df["type"] == "Free"].copy() if free_only else df.copy()
    
    # 2. Vectorize course syllabi + student skill query
    tfidf = TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(working_df["tags"].tolist() + [student_query])
    
    # 3. Compute Cosine Similarity between student query and all courses
    query_vector = tfidf_matrix[-1]
    course_vectors = tfidf_matrix[:-1]
    similarity_scores = cosine_similarity(query_vector, course_vectors).flatten()
    
    # Convert to Confidence Percentage (Scaled for UI presentation)
    working_df["confidence_score_%"] = (similarity_scores * 100).round(1)
    working_df = working_df.sort_values(by="confidence_score_%", ascending=False)
    
    return working_df[["title", "type", "price", "confidence_score_%"]]

if __name__ == "__main__":
    print("=== EduBridge AI Course Matcher (Unbiased Paid vs Free) ===")
    student_goal = "react nodejs mongodb full-stack web development"
    print(f"\nStudent Query: '{student_goal}'")
    print(recommend_courses(student_goal, free_only=False).to_string(index=False))