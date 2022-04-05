import React from "react";
import styled from "styled-components";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../Provider/StateProvider";
import { getBasketTotal } from "../Provider/reducer";
import { useNavigate } from "react-router-dom";
function Subtotal() {
  const history = useNavigate();
  const [{ basket }] = useStateValue();
  return (
    <>
      <SubtotalStyle>
        <CurrencyFormat
          value={getBasketTotal(basket)}
          // value={0}
          renderText={(value) => (
            <>
              <p>
                Subtotal ({basket.length} items): <strong>{value}</strong>
              </p>
              <small className="subtotal__gift">
                <input type="checkbox" />
                This order contains a gift
              </small>
            </>
          )}
          displayType={"text"}
          decimalScale={2}
          thousandSeparator={true}
          prefix={"$"}
        />
        <button className="btn" onClick={() => history("/payment")}>
          {" "}
          Process to Checkout
        </button>
      </SubtotalStyle>
    </>
  );
}

export default Subtotal;
const SubtotalStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 3px;
  justify-content: space-between;
  width: 320px;
  height: 100px;
  color: black;
  background: #f3f3f3;
  border: 2px solid #eee;
  .subtotal__gift {
    display: flex;
    align-items: center;
  }
  input {
    margin-right: 5px;
  }
  button {
    border-radius: 3px;
    width: 100%;
    height: 30px;
  }
`;
