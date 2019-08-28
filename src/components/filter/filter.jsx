
var React = require('react');

class Filter extends React.Component{
	
		render() {
			return (
				<div>
					<div className="filter">
						<h2 className="white margin-left-5">Refine your products</h2>
						
						<div className="display-flex">
							<p className="category-margin margin-bottom-2">Category </p>
							<p className="cost-price-margin margin-bottom-2">Cost Price</p>
							<p className="sales-rank-margin margin-bottom-2">Sales Rank</p>
							<p className="profit-margin margin-bottom-2">Profit Margin</p>
							
						</div>
						
						<div className="display-inl">
							<div className="category-list">
								<select className="list-style" onChange={this.toggleCategory} value={this.props.selectedCategory}>
					    		<option value="all">All</option>
					    		<option value="babyproducts">Baby Products</option>
					    		<option value="beauty">Beauty</option>
					    		<option value="cellphones">Cell Phones & Accessories</option>
					    		<option value="health">Health & Personal Care</option>
					    		<option value="home">Home & Kitchen</option>
					    		<option value="movies">Movies & Tv</option>
					    		<option value="musicalInstruments">Musical Instruments</option>
					    		<option value="garden">Patio, Lawn & Garden</option>
					    		<option value="sportsOutdoors">Sports & Outdoors</option>
					    		<option value="toysGames">Toys & Games</option>
					    		</select>
				    		</div>

				    		<div className="cost-price-list">
					    		<select className="list-style" onChange={this.toggleCategory} value={this.props.selectedCategory}>
					    		<option value="all">All</option>
					    		<option value="high-low">High - Low</option>
					    		<option value="low-high">Low - High</option>
					    		<option value="under20">Under 20</option>
					    		<option value="under40">Under 40</option>
					    		<option value="under60">Under 60</option>
					    		<option value="under80">Under 80</option>
					    		<option value="under100">Under 100</option>
					    		<option value="over100">over 100</option>
					    		</select>
				    		</div>

				    		<div className="cost-price-list">
					    		<select className="list-style" onChange={this.toggleCategory} value={this.props.selectedCategory}>
					    		<option value="all">All</option>
					    		<option value="high-low">High - Low</option>
					    		<option value="low-high">Low - High</option>
					    		<option value="under20">Under 20</option>
					    		<option value="under40">Under 40</option>
					    		</select>
				    		</div>

				    		<div className="cost-price-list">
					    		<select className="list-style" onChange={this.toggleCategory} value={this.props.selectedCategory}>
					    		<option value="all">All</option>
					    		<option value="high-low">High - Low</option>
					    		<option value="low-high">Low - High</option>
					    		<option value="under20">Under 20</option>
					    		<option value="under40">Under 40</option>
					    		</select>
				    		</div>
				    		
				    	</div>
					</div>
				</div>
			)
		}
	}

export default Filter;