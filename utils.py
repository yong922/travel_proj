
import math
import statistics


# 따로 돼있는 딕셔너리를 하나의 딕셔너리로 합쳐주는 함수
def merge_dicts(*dicts):
    merged_dict = {}
    for key in set().union(*dicts):
        merged_dict[key] = [dic[key] for dic in dicts if key in dic]
    return merged_dict


# user_prefer 계산식
# : 선택된 여행지 사진(3)과, 이미지(1)에 대한 계산
def calculate_average(tour_info, tema, mem_id):
    # cate2 제외하고 평균값
    keys = [key for key in tour_info if key != 'tour_num' and key not in ['dy', 'st', 'ep', 'ev']]
    averages = [round(statistics.mean(tour_info[key]), 3) for key in keys]
    result = {key: average for key, average in zip(keys, averages)}
    result['mem_id'] = mem_id

    # theme에서 받은 cate2값 넣기
    keys_update = ['dy', 'st', 'ep', 'ev']
    result2 = result.copy()
    for key in keys_update:
        if key == tema:
            result2[key] = 1
        else:
            result2[key] = 0
    return result2


### 점수 모델 계산식 ###
# cate1 계산식
def calculate_ele_differ1(user_row, tour_df):
    total_difference = 0
    for col1, col2 in zip(user_row, tour_df):
        difference = col1 - col2
        if abs(difference) >= 0.7:
            total_difference -= abs(difference)
        else:
            total_difference += abs(difference)
    return round(total_difference,3)

# cate2 계산식
def calculate_ele_differ2(user_row, tour_df):
    for col1, col2 in zip(user_row, tour_df):
        if col2 == 1 and col1 == 1:
            score = 1
            break
        elif col1 == 0 :
            score = 0
    return score

# cate3 계산식
def calculate_ele_differ3(user_row, tour_df):
    score = tour_df[0]
    return score

# cate4 계산식
def calculate_ele_differ4(user_row, tour_df):
    max_user_row = max(user_row)
    max_tour_value = max(tour_df)
    score = 0
    for col1, col2 in zip(user_row, tour_df):
        if col1 == max_user_row and col2 == max_tour_value:
            score = 1
            break
    return score


# 조회한 데이터들 순서 맞춰서 튜플, 리스트안 튜플 형태로
def dict_to_tuple(user_row, tour_df):
    sort_standard = ['s_m', 'd_m', 'wt', 'oc', 'am', 'fw', 'o_bd', 'cty', 'fl', 
                     'y_bd', 'wk', 'sity', 'b_bd', 'sh', 'dy', 'st', 'ep', 'ev', 
                     'ch_vs', 'zero', 'one', 'two', 'three', 'four', 'five']
    user_row = {k: user_row[k] for k in sort_standard if k in user_row}
    user_tuple = tuple(user_row.values())
    tour_tuples = [tuple(d.values()) for d in tour_df]
    return user_tuple, tour_tuples


# top5 리스트로 받는 함수
# : total_difference 지우면 안됩니다
def calculate_ele_differ_top5(user_row, tour_df):
    score_list = []

    dict_user , dict_tour = dict_to_tuple(user_row, tour_df) 

    user_row1 = dict_user[:14]
    user_row2 = dict_user[14:18]
    user_row3 = dict_user[-7:-6]
    user_row4 = dict_user[-6:]
    
    for i in dict_tour:
        total_difference = 0
        tour_row1 = i[1:15]
        tour_row2 = i[15:19]
        tour_row3 = i[-7:-6]
        tour_row4 = i[-6:]
        
        score1 = calculate_ele_differ1(user_row1,tour_row1)
        score2 = calculate_ele_differ2(user_row2,tour_row2)
        score3 = calculate_ele_differ3(user_row3,tour_row3)
        score4 = calculate_ele_differ4(user_row4,tour_row4)
        
        score = score1+score2+score3+score4
        score_round = round(score,3)
        score_list.append((i[0],score_round))
        
    sorted_scores = sorted(score_list, key=lambda x: x[1], reverse=True)
    top_5 = [x[0] for x in sorted_scores[:5]]
    
    return top_5
