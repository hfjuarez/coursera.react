import React from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";

function RenderCard({ item, isLoading, errMess }) {
	console.log();
	console.log(errMess);
	console.log();
	if (isLoading) {
		return <Loading />;
	} else if (errMess) {
		console.log();
		console.log("hoola");
		console.log();
		return <h4>{errMess}</h4>;
	} else
		return item ? (
			<FadeTransform
				in
				transformProps={{
					exitTransform: "scale(0.5) translateY(-50%)",
				}}
			>
				<Card>
					<CardBody>
						<CardImg src={baseUrl + item.image} alt={item.name} />
						<CardTitle>{item.name}</CardTitle>
						{item.designation ? (
							<CardSubtitle>{item.designation}</CardSubtitle>
						) : null}
						<CardText>{item.description}</CardText>
					</CardBody>
				</Card>
			</FadeTransform>
		) : null;
}

function Home(props) {
	return (
		<div className="container">
			<div className="row align-items-start">
				<div className="col-12 col-md m-1">
					<RenderCard
						item={props.dish}
						isLoading={props.dishesLoading}
						errMess={props.dishesErrMess}
					/>
				</div>
				<div className="col-12 col-md m-1">
					<RenderCard
						item={props.promotion}
						isLoading={props.promoLoading}
						errMess={props.promoErrMess}
					/>
				</div>
				<div className="col-12 col-md m-1">
					<RenderCard
						item={props.leader}
						isLoading={props.leaderLoading}
						errMess={props.leaderErrMess}
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
