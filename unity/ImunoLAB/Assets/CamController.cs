using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CamController : MonoBehaviour {

	public float speed = 3.5f;
     private float X;
     private float Y;
 
     void Update() {
		
		#if UNITY_EDITOR
            if(Input.GetMouseButton(0)) {
             transform.Rotate(new Vector3(Input.GetAxis("Mouse Y") * speed, -Input.GetAxis("Mouse X") * speed, 0));
             X = transform.rotation.eulerAngles.x > 25 ? transform.rotation.eulerAngles.x : 25;
             Y = transform.rotation.eulerAngles.y;
             transform.rotation = Quaternion.Euler(X, Y, 0);
         }
		#endif
		 
		#if UNITY_ANDROID
			if (Input.touchCount > 0 && Input.GetTouch(0).phase == TouchPhase.Moved)
			{
				Vector2 touchDeltaPosition = Input.GetTouch(0).deltaPosition;
	 
			 transform.Rotate(new Vector3(touchDeltaPosition.y * speed, -touchDeltaPosition.x * speed, 0));
             X = transform.rotation.eulerAngles.x > 25 ? transform.rotation.eulerAngles.x : 25;
             Y = transform.rotation.eulerAngles.y;
             transform.rotation = Quaternion.Euler(X, Y, 0);
        
			}
		#endif
         
     }
}
