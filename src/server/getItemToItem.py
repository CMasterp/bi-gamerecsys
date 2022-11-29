import pandas as pd
import numpy as np
import sys
import ast
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

df = pd.read_csv('steam_games.csv')
data = df[['genre','rate','name', 'url']]
data = data.head(20000)
data.shape
count_vector = CountVectorizer(ngram_range=(1,3))
c_vector_genre = count_vector.fit_transform(data['genre'])
c_vector_genre.shape
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(data['genre'])
#print('TF-IDF(shape) :',tfidf_matrix.shape)
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
#print('cosine_sim.shape Result :',cosine_sim.shape)
name_to_index = dict(zip(data['name'], data.index))

# 게임 제목 Father of the Bride Part II의 인덱스를 리턴
input = sys.argv[1].lower()
input = input.replace(' ','')
# print('Your Selection is : ' + input.upper())
def get_recommendations(name, cosine_sim=cosine_sim):
    # 선택한 게임의 타이틀로부터 해당 게임의 인덱스를 받아온다.
    idx = name_to_index[name]

    # 해당 게임와 모든 게임와의 유사도를 가져온다.
    sim_scores = list(enumerate(cosine_sim[idx]))

    # 유사도에 따라 게임들을 정렬한다.
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 가장 유사한 10개의 게임를 받아온다.
    sim_scores = sim_scores[1:31]

    # 가장 유사한 10개의 게임의 인덱스를 얻는다.
    movie_indices = [idx[0] for idx in sim_scores]

    # 가장 유사한 10개의 게임의 제목을 리턴한다.
    return data['url'].iloc[movie_indices]
print(get_recommendations(input))