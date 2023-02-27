### IZZZI market place

Online sore for coupons. 
Anonymous users can view coupons, and registered users can buy coupons from establishments,
organizations or companies. 
And then use these coupons as a discount through the QR code.
Users can also become partners and sell their coupons.

#### TODO: docker is not yet needed
#### For development:
``` $ find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs sudo rm -rf ```

``` $ chmod +x src/entrypoint.sh ```

``` $ docker-compose up ```

### Run tests:
In separate tab

``` $ docker-compose exec django bash ``` - get into django container

``` $ $test ``` - run all tests
