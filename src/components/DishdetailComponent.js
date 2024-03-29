import React, { Component, useState } from "react";
import { baseUrl } from "../shared/baseUrl";
import {
	Button,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Toast,
	ToastBody,
	ToastHeader,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	Input,
	Row,
	Col,
	Label,
	ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { Control, LocalForm, Errors } from "react-redux-form";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
	return (
		<FadeTransform
			in
			transformProps={{
				exitTransform: "scale(0.5) translateY(-50%)",
			}}
		>
			<Card>
				<CardImg top src={baseUrl + dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</FadeTransform>
	);
}

function RenderComments({ comments, postComment, dishId }) {
	const listOfComments = comments.map((comment) => {
		return (
			<Fade in>
				<Toast key={comment.id}>
					<ToastHeader>
						{comment.author} --{" "}
						{new Intl.DateTimeFormat("en-US", {
							year: "numeric",
							month: "short",
							day: "2-digit",
						}).format(new Date(Date.parse(comment.date)))}{" "}
						<Badge color="warning">{comment.rating}/5 Stars!</Badge>
					</ToastHeader>
					<ToastBody>{comment.comment}</ToastBody>
				</Toast>
			</Fade>
		);
	});

	return (
		<div>
			<Stagger in>{listOfComments}</Stagger>
			<CommentForm dishId={dishId} postComment={postComment} />
		</div>
	);
}

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	handleSubmit(values) {
		// console.log("Current State is: " + JSON.stringify(values));
		// alert("Current State is: " + JSON.stringify(values));

		this.props.postComment(
			this.props.dishId,
			values.rating,
			values.author,
			values.comment
		);
		// event.preventDefault();
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
		});
	}

	render() {
		return (
			<div>
				<Button outline color="primary" onClick={this.toggleModal}>
					<span className="fa fa-pencil fa-lg"></span>
					Submit Comment
				</Button>
				<Modal
					isOpen={this.state.isModalOpen}
					toggle={this.toggleModal}
				>
					<ModalHeader toggle={this.toggleModal}>
						Submit Comment
					</ModalHeader>
					<ModalBody>
						<LocalForm
							onSubmit={(values) => this.handleSubmit(values)}
						>
							<Row className="form-group">
								<Label htmlFor="rating" md={2}>
									Raiting
								</Label>
								<Col md={10}>
									<Control.select
										model=".rating"
										id="rating"
										name="rating"
										placeholder="Your Name"
										className="form-control"
									>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" md={2}>
									Your Name
								</Label>
								<Col md={10}>
									<Control.text
										model=".author"
										id="author"
										name="author"
										placeholder="Your Name"
										className="form-control"
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15),
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											required: "Required",
											minLength:
												"Must be greater than 2 characters",
											maxLength:
												"Must be 15 characters or less",
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment" md={2}>
									Comment
								</Label>
								<Col md={10}>
									<Control.textarea
										model=".comment"
										id="comment"
										name="comment"
										rows="6"
										className="form-control"
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={{ size: 10, offset: 2 }}>
									<Button type="submit" color="primary">
										Submit Comment
									</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const DishDetail = (props) => {
	if (props.isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (props.errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{props.errMess}</h4>
				</div>
			</div>
		);
	} else if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 mt-2">
						<Breadcrumb>
							<BreadcrumbItem>
								<Link to="/menu">Menu</Link>
							</BreadcrumbItem>
							<BreadcrumbItem active>
								{props.dish.name}
							</BreadcrumbItem>
						</Breadcrumb>
					</div>

					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments
							comments={props.comments}
							postComment={props.postComment}
							dishId={props.dish.id}
						/>
					</div>
				</div>
				<Modal></Modal>
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default DishDetail;
