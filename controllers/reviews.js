const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully Created New Review!')
    res.redirect(`/campgrounds/${campground._id}`);
}
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: { reviews: reviewId}});//Delete the review in the array of Campground
    await Review.findByIdAndDelete(reviewId);//Delete from the Review Collection

    res.redirect(`/campgrounds/${id}`);
}