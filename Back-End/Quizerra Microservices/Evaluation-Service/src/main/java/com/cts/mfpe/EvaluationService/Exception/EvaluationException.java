package com.cts.mfpe.EvaluationService.Exception;

public class EvaluationException extends Exception{
    public EvaluationException(){
        super("Error: Either user doesn't exists or answer or maybe both");
    }
}
