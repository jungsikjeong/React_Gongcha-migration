function mentionHandling(replyCommentUser: any, contents: string) {
  const nickPattern = escapeRegExp(replyCommentUser.nickName);

  // contents에서 replyCommentUser의 nickName을 포함한 멘션을 찾는 정규 표현식 패턴
  const mentionPattern = new RegExp(`@${nickPattern}\\b`, 'gi');

  // 멘션을 제외한 결과를 반환
  const result = contents.replace(mentionPattern, '');

  return result;
}

// 특수 문자를 이스케이프 처리하는 함수
function escapeRegExp(nickname: string) {
  return nickname.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}

export default mentionHandling;
