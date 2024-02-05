const GameLoading = ({ publisher, subscriber }) => {
  console.log(publisher);
  console.log(subscriber);
  const pubnickname = JSON.parse(publisher.stream.connection.data).clientData;
  const subnickname = JSON.parse(subscriber.stream.connection.data).clientData;

  return (
    <>
      <h1>매칭 정보</h1>
      <div>{pubnickname}</div>
      <div>VS</div>
      <div>{subnickname}</div>
    </>
  );
};

export default GameLoading;
