import React from "react";
import Article from "../../containers/Article";
import Header from "../../components/Header";

export default React.memo((props: any) => {
  return (
    <>
      <Header />
      <Article article_id={props.match.params.id} />
    </>
  );
});
