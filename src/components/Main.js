require('normalize.css');
require('styles/App.css');

import React from 'react';

/*
 * @author Karim <kma@crossworkers.com>
 * @description Responsible for the add new contact section in the Contact Book parent Component
 */
class Add extends React.Component {
    
   constructor(props) {
        
        super(props);
        
        this.state = { name : '', phone : '', temp_image : ''};
   }
   
   //on change in name's input update name state
   onChangeName(event){
       
        this.setState({name: event.target.value});
   }
   
   //on change in name's input update phone state
   onChangePhone(event){
       
        this.setState({phone: event.target.value});
   }
   
   //when user clicks saves it calls the parent component function
   createNewContact()
   {
        let result = this.props.createNewContact(this.state.name,this.state.phone,this.state.temp_image);
        
        if(result == true)
        {
            this.state.name = '';
            this.state.phone = '';
            this.state.temp_image = '';
            
            alert('Contact added');
        }
   }
   
   chooseFile()
   {
        document.getElementById('image_file').click();
   }
   
   fileUpload(event)
   {
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onload = function(upload) {
           
            this.state.temp_image = upload.target.result;
            
            this.forceUpdate();
            
        }.bind(this);

        reader.readAsDataURL(file);
   }
    
  render() {
        
        let image_style = {};
        let show_message_class = 'show';
        if(this.state.temp_image != '')
        {
            image_style = {
                backgroundImage: 'url(' + this.state.temp_image + ')'
            };
            show_message_class = 'hide';
        }
        
        if(this.props.show == 'true')
        {
            return (
                    
                <div className="add">

                      <div className="row">

                              <div className="col-xs-8">

                                      <div className="contact_form">

                                              <div className="row">

                                                  <div className="col-xs-12">

                                                      <div className="photo_container">

                                                          <div style={image_style} onClick={this.chooseFile.bind(this)}>
                                                            <span className={show_message_class} >Select Photo</span>
                                                          </div>
                                                          <input type="file" id="image_file" name="image_file" onChange={this.fileUpload.bind(this)} />
                                                          

                                                      </div>

                                                      <div className="details">

                                                          <div className="name"><input value={this.state.name} type='text' placeholder='Name' onChange={this.onChangeName.bind(this)} /></div>
                                                          <div className="phone"><input value={this.state.phone} type='text' placeholder='Phone' onChange={this.onChangePhone.bind(this)} /></div>

                                                      </div>

                                                  </div>

                                              </div>
                                      </div>
                              </div>
                              <div className="col-xs-2">
                                      <div className="button cancel_button" onClick={this.props.cancel.bind()}>
                                              CANCEL
                                      </div>
                              </div>
                              <div className="col-xs-2">
                                      <div className="button save_button" onClick={this.createNewContact.bind(this)}>
                                              SAVE
                                      </div>
                              </div>

                      </div>

                </div>
            );
        }
        else
        {
            return null;
        }
  }
}


/*
 * @author Karim ElSohby <kma@crossworkers.com>
 * @description Responsible for the search section in the Contact Book parent Component
 */
class Search extends React.Component {
  
   constructor(props) {
        
        super(props);
        
        this.state = { query : '' };
   }
   
   //on change in search query field call update contacts in parent component
   onChange(event)
   {
        this.setState({query: event.target.value});
       
        this.props.updateContacts(event.target.value);
   }
    
   render() {
       
        if(this.props.show == 'true')
        {
            return (
                    
                <div className="search">

                      <div className="row">

                              <div className="col-xs-10">
                                      <div className="search_form">
                                              <input type='text' value={this.state.query} placeholder="Type here to search" onChange={this.onChange.bind(this)} />
                                      </div>
                              </div>
                              <div className="col-xs-2">
                                      <div className="button add_button" onClick={this.props.addNew.bind()} >
                                              ADD NEW
                                      </div>
                              </div>

                      </div>

                </div>
            );
        }
        else
        {
            return null;
        }
  }
}

/*
 * @author Karim ElSohby <kma@crossworkers.com>
 * @description Responsible for the contact listed in the listing component
 */
class Contact extends React.Component {
    
    constructor(props) {
        
            super(props);
   }
   
   //call deletContact function in parent to delete a contact
   deleteContact()
   {
        this.props.deleteContact(this.props.id);
   }
    
    render() {
        
        let image_style = {};
        let show_message_class = 'show';
        if(this.props.image != '')
        {
            image_style = {
                backgroundImage: 'url(' + this.props.image + ')'
            };
            show_message_class = 'hide';
        }
        
        return (
        
            <div className="contact">

                <div className="row">

                    <div className="col-xs-12">

                        <div className="photo_container">

                            <div style={image_style} >
                                <span className={show_message_class} >No Photo</span>
                            </div>

                        </div>

                        <div className="details">

                            <div className="name">{this.props.name}</div>

                            <div className="phone">{this.props.phone}</div>

                        </div>

                        <div className="delete"><img src='../images/delete.png' onClick={this.deleteContact.bind(this)} /></div>
                        
                    </div>

                </div>

            </div>
    );
  }
}

/*
 * @author Karim ElSohby <kma@crossworkers.com>
 * @description reponsible for listing the contacts
 */
class Listing extends React.Component {
  
   constructor(props) {
        
            super(props);
   }
   
   //call delete contact in parent component
   deleteContact(id)
   {
       this.props.deleteContact(id);
   }
   
   render() {
       
   let contactNodes = this.props.data.map(function(contact) {
       
            return (
                    
                <Contact key={contact.key} id={contact.id} name={contact.name} phone={contact.phone} image={contact.image} deleteContact={this.deleteContact.bind(this)} ></Contact>
            );

    }.bind(this));

    return (
               
        <div>{contactNodes}</div>
    );
    
   }
  
}


/*
 * @author Karim ElSohby <kma@crossworkers.com>
 * @description a simple Contact Book Component with add,delete functionality
 */
class ContactBook extends React.Component {
    
    //initalizing 'contacts' in local storage with sample data if it is found empty for demo purposes
    constructor(props) {
        
        super(props);
        
        if(typeof localStorage['contacts'] === 'undefined')
        {
            let contacts = [
                                {key: 1, id : 1, name: 'Edward Brown', phone: '8-(344)178-5843' , image : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCABGAEYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9Hf8AgmquP2R7W3/59dUvv/SqSu5/ZpXd+058RM/88LH+T188/wDBDf8Aai0v9p39iT7Vbtarr1pqlydVsYT/AMe8ru0n/fHzV9Efs+T4/ap8Y9v9Btv/AGavyvLaLp4iFKqfoGOqe0hXnTJvihJDafEv7T9ojs1tMTuzSeSsUanLMx9K+Nf2v/8AgsH4d0DUPEXg34aaL/wmmpSX8ly+rzSbdMtHC44H35iPYY96o/8ABaT9pS8174wW/wAI/Cl59jiuIluvEd9bH97PG3C26+xxk183fD34IWenRIY7Zdm0Yx0xWeKxH1X2mH7nrZblcK9OnianQXxH8f8A4j/H/RIdN8Z61Y3GhWpEy2MNhHFbh/XPL5+hFeY/tE/Bjwb+0J4NtdJ1PWJvDd9pZaS2uiu63dj0DKx3FfcdK+gIfh1a2EDt9nyM14f+0V8PZxqZukXaq7So9BXj4Gs/aJn0mKo0vq7sfBvin4Gaz8F/i7Hp+pRR3Fo0TeVqtmDLa3aEHbiQ9AR69K9o/Z68NRxeGbe8j2iSKVhgHIHFepeLfh7P448F3MMWftEUR8jP+r3gd64v9m26e30M2c3+uguZEkz/AHhnP619Viq16R8bRo8lW59CWNu2l2NvJJ96aFCf++RRXWaJ8GvFHjbR7W40fRNWvoDCh8yGLdGeMcGivnfZ1HqjtlJXPTv+CHfwKj/ZY/aM8RaXYXEj6f4s04H7O7cpJEdwb6EV+g3wrnGn/tQeMrg/dt9Dimb/AIAz5r57/wCCavwU1bwr8VvE48TafJDqHhu1jtraeRfvh9xwD9BivUvFvxT0z4OfGDxlqWtapZ6Sup+HBb2rXWVjuZ2YiOFEGWdmJ6Lz6ivUwEqk8RT9oeRj1TjGoqR+WHxI8e3HxQ/ax8e695ZHmagB67VRFFex+AL6RYhFZr50bAbj1xXxL8N/2kde0L9ofUPCPjLw8+j6vqd87tcmCWKExsT5e8OAwB45PFdL+0X+1P4++CnivTbHwosc2n6hc/ZzPBB5kW4HacOO2R1rHMcuq1MQfV4PHYZYb92z730nQ43RWdvmYcg9jXG/G3wLHZ6TcXjMCvl7uRXmfwL/AG0b7xDBBY6lo11falIxgM1vCY4RKvDKzMp79xXsHi/wlqXxQ8BbtVlkseUkNnaSdFLDhpOD04rz40eWp7Mc6vNT9ofMfw8u4b+9u9NW4SSS5eTyPKPmbHOfvelea+DPBC+GPiZrGk6paXFr5d9G9yuMF1YZLr7EdK+4Pjh8L7L4KXdpb+GfDNrfR6haxXDBEVQgZQXy3Ut1615j8ILPwLe/tXalp/jK3uPIvre1W0eI7TbB1ztYf7Jau+riuZchz1cvhToLGPq7H2l+xd+1t4P8P/DTTvD6xtp9ppNp/o8lwoBmRnLfmN2PworzbVP2P7qbwnp+oaLbzX2mxyy2MLiTcGWN2Ab6kDmiiOIqpJJHi1KNHmd2fpzP8N4NGsL28hSNtQuADJJt+/jpn1xXyF8WP2X7f4wftcaXrun3S6f428L6UZ9Eu5JC1rgTL5sMsfRlk/vHle1e2/s0ftdr+0PBdXU8aWEUk/lWkAUtlP7zGtzxvoXh/wCF3xTbx1rXiDSNGsl042sv22dYUzncXGTn8K+yrZfCpVhicLsfJ0sZOkp0q25+Of8AwUW+Bdx8bf8AgrDp7+MPDNnY2OiaRDeX9tDdLdLekFwuAQNy55welch8c/2T7GDRZrfw7faVa6ALjz0tru3cC2kJyfKMbgAA9ARXX/8ABbz9uHwY37VOgeKfg78QPDHiq4vrA2Wu2tteiQW4Vjtf5emM9q8z8IfGjT/FPg7d4k8QWt1dXES+WsrJGoOOwXr9TzXzucUsTCvzrY++4dqYaeFjB2uz2r9mX4L2fgXwdC00y3k9vLhH3YEjSHJIHOP6V9E33h6wv/B9rY3DND51wNrxHDFAfUV8ffDH4hrJpMdva3DTfZZAcq+Q2OM19JaB8Q473wxYzt/yyVcD+7xzXhULxnzSPSx0VFWWx6J8UvhNr3jPxfoP9m6RcXPh+a2itft7XG0HIwd65BbHOM57V+fMFlqEP7cevrqN7brcNOG0+QAi3mgTKKEYgZwFww9RX6LfCj9oWzcTaZ532cLbyyNK5+WLahOR6HI618n/APBTL4CyeEf+CYvwk+Kvh+2ZNc8M6jPPqE6j95Ja3cryMWPUqrHIz6172X4Onipyiux83mWZVKGHSe1z7W/Y1/aJ8L+GPgbpfhfWJLprq0Mt6sggLRsskjHGf7wJor8K9M/4KyfET4W3qR2c+k61YSW4EUWoWrt5OTu4ZCCe/Umiu2OU4yMVGLVjw5ZjhJPmkndnsX7RP/BxF8QtI0pfCvwLjsfBHh22t/sz30lkh1Cc5/1gJ3FT9cV8E/Hv9p/4lftFarLe/EDx14h8VXk0hkkS9vZCsTYxmOLIVePQVx1heR3sHlr+6ltRjP8Af9/r79afeDFmduV+hxX2cVyq0VY+VrSb1ZgaFrv/AAhniVb1VX93+7YEZ3q3XPrX6B/saad9ttLWaHw9az2dxCjK3lLtOQDmvz11K1bKyH7yggZr2r4Cft8+KPgHoKabHp9tqlnCoRC3DRgDA6V4+dYCWIpWo7n0nDecRwkr1tj9JDpK+FdSe6jRbP7ZiMxx/KFI68D+deg23xQtPCfhKOCa8Ul8YG7Jr5M8G/GD4ofGv4J6f48sPCjTeHbq8NgNRBzDa3B/gYDn8TxzXT+A/BXiC61OFdWjuZ7ySTKRs4aMj1AX+VfA4jCSor2ctz9Ao4inin7SL0PbY/H2qeO/Emn6Tokk0c2q3K2BRSQ0qu+CfxFfoF+3t8JIfEn7AXifwJDb7Y7Hwy8ccSjHzRRBwB+KH86+cf8AgnV8I/D+lfH601DxJq2n22uWqtJpmjXJxLJIF4cevcgda+5vGNpHrsV1HcR+dDcwtDKjZ+fcNv1/i6V72RUXDU+X4irRq+5E/k11W3jmIVcyIh2gP/CR1H50V237TPgKb4T/AB78ceG5kEcmha9c2eAMcK7Y/wAaK+2h8KPg5KzseWW+gxS6dLctNP50P3GwOPwqVY/O0KGRvvebtc/3hRRWhJBdadG0JJX9ayZtKjJ+7+tFFC00QNJ7n6x/8Efvg5rXxI/Y40fULPxA9nZ6ZrN5CunSAvazENE5Z06MTkAE5IxxX25+z9+zRYXWv3l3qi2b6hay+R5tvGQowcHCnj8etFFfIY6nF13ddT6/C1Jworkdtj0b4wfsbaHqifarKaTT9XjYSWOoRLi4tpB0bd161k/B/wDbV1TRPina/Dnx1ajVNeYLHa6xp+NlyvOPOjbbtYY6qTmiir+CSUdDGnJzV56n40f8FvfBMHwq/wCCjXxGihZpodWvINTAbrGZrdJGH5k0UUV9RR+Beh83W/iP1P/Z'},
                                {key: 2, id : 2, name: 'John Doe', phone: '6-(354)178-6578' , image : 'data:image/jpeg;base64,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'},
                                {key: 3, id : 3, name: 'Foo Doe', phone: '8-(122)769-1211' , image : 'data:image/jpeg;base64,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'},
                                {key: 4, id : 4, name: 'Jane Doe', phone: '8-(120)767-1201' , image : 'data:image/jpeg;base64,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'}
                           ];
            localStorage['contacts'] = JSON.stringify(contacts);
        }
        
        this.state = {
               query : '',
               showAdd : 'false',
               showSearch : 'true'

        };
    }
    
    //called by the search component to update the query string and update and rerender the contacts
    updateContacts(query)
    {
        this.state.query = query;
        
        this.forceUpdate();
    }
    
    //filter contacts based on query string
    filterContacts()
    {
        let result = Array();
        
        let contacts = JSON.parse(localStorage['contacts']);
        
        for (let contact of contacts){
            
            if(contact.name.includes(this.state.query))
            {
                result.push(contact);
            }
        }
        
        return result;
    }
    
    //get max key from contacts
    getMaxKey(contacts)
    {
        let max = -999999;
        for(let i=0; i<contacts.length; i++)
        {
            if(contacts[i].key > max)
            {
                max = contacts[i].key;
            }
        }
        return max;
    }
    
    //create new contact
    createNewContact(name,phone,image)
    {
        //validation
        if(!name)
        {
            alert('Name is required');
            return false;
        }
        else if(!phone)
        {
            alert('Phone is required');
            return false;
        }
        else if(!isNaN(name))
        {
            alert('Name must not be a number.');
            return false;
        }
        else if(isNaN(phone))
        {
            alert('Phone must be a number.');
            return false;
        }
        //end of validation
        
        
        let contacts = JSON.parse(localStorage['contacts']);
        
        let key = this.getMaxKey(contacts) + 1;
        
        let contact = {key: key, id: key , name: name, phone: phone, image: image};
        
        contacts.unshift(contact);
        
        localStorage['contacts'] = JSON.stringify(contacts);
        
        this.forceUpdate();
        
        return true;
    }
    
    //delete a contact
    deleteContact(id)
    {
        if(!confirm('click ok if you want to delete this contact.'))
        {
            return;
        }
        
        let contacts = JSON.parse(localStorage['contacts']);
        
        for(let i=0; i<contacts.length; i++)
        {
            if(contacts[i].id == id)
            {
                contacts.splice(i, 1);
                break;
            }
        }
        
        localStorage['contacts'] = JSON.stringify(contacts);
        
        this.forceUpdate();
    }
    
    //when user clicks add on search component, it shows add component and hide the other
    addNew()
    {
        this.state.showAdd = 'true';
        this.state.showSearch = 'false';
        
        this.forceUpdate();
    }
    
    //when user clicks cancel on add component, it shows search component and hide the other
    cancel()
    {
        this.state.showAdd = 'false';
        this.state.showSearch = 'true';
        
        this.forceUpdate();
    }
  
    render() {
        
        return (
                
            <div className="container">

                      <div className="main">

                              <div className="title">
                                      Contact Book
                              </div>

                              <Search show={this.state.showSearch} updateContacts={this.updateContacts.bind(this)} addNew={this.addNew.bind(this)} />
                              <Add show={this.state.showAdd} createNewContact={this.createNewContact.bind(this)} cancel={this.cancel.bind(this)} />

                              <Listing data={this.filterContacts()} deleteContact={this.deleteContact.bind(this)} />

                      </div>

              </div>
    );
  }
}

ContactBook.defaultProps = {
};

export default ContactBook;
